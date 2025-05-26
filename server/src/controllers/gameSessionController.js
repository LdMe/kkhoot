import { customAlphabet } from "nanoid";
import gameSessionModel from "../models/gameSession.js";
import playerModel from "../models/player.js";
import triviaModel from "../models/trivia.js";


const getGameSession = async (req, res) => {
    const id = req.params.id;
    const gameSession = await gameSessionModel.findById(id).populate("players", "name").populate("triviaId");
    res.json(gameSession);
}
const getRandomCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
const createGameSession = async (req, res) => {
    const triviaId = req.params.id;
    // primero borramos las sesiones anteriores para el mismo trivia (asi evitamos duplicados)
    await gameSessionModel.deleteMany({ triviaId });
    const gameSession = new gameSessionModel({ triviaId, code: getRandomCode() });
    await gameSession.save();
    res.json(gameSession);
}

const joinPlayer = async (req, res) => {
    const username = req.body.username;
    const sessionCode = req.params.id;
    const gameSession = await gameSessionModel.findOne({ code: sessionCode }).populate("players");
    console.log("gameSession", sessionCode, gameSession);
    if (gameSession.players.some(player => player.name === username)) {
        return res.status(400).json({ error: "username already exists" });
    }
    const newPlayer = new playerModel({ name: username, gameSessionId: gameSession._id })
    await newPlayer.save();
    gameSession.players.push(newPlayer);
    await gameSession.save();
    res.json(newPlayer);

}

/**
 * Starts a game session by updating its state to "started" and broadcasting the event
 * to all connected clients via Socket.io. Also initiates a countdown timer for the session.
 * 
 * @param {Object} req - HTTP request object containing the session ID in req.params.id.
 * @param {Object} res - HTTP response object used to send back the updated game session.
 */

const startGameSession = async (req, res) => {
    const sessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(sessionId);
    gameSession.state = "started";
    gameSession.updatedAt = new Date();
    await gameSession.save();
    const io = req.io;
    io.emit("gameSessionStarted", gameSession); // TODO avisar solo a los de la partida
    
    startTimer(io);
    res.json(gameSession);
}
/**
 * Inicia un temporizador que emite el evento "timer" a traves de Socket.io cada segundo, con el valor actual del temporizador.
 * El temporizador se detiene cuando llega a 0.
 * @param {SocketIO.Server} io - Instancia de Socket.io
 * @param {number} [timer=30] - Valor inicial del temporizador
 */
const startTimer = (io,timer = 30)=>{
    const interval = setInterval(() => {
        timer--;
        console.log("timer", timer);
        if(timer === 0){
            clearInterval(interval);
        }
        io.emit("timer", timer);
    }, 1000);
}
/**
 * Advances the current question of a game session to the next one.
 * @param {Object} req - HTTP request object.
 * @param {string} req.params.id - The ID of the game session.
 * @param {Object} res - HTTP response object.
 * @returns {Object} The next question of the game session.
 */
const nextQuestion = async (req, res) => {
    const sessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(sessionId).populate("triviaId");
    gameSession.questionIndex++;
    if (gameSession.questionIndex >= gameSession.triviaId.questions.length) {
        gameSession.state = "finished";
        gameSession.questionIndex = 0;
        const io = req.io;
        io.emit("gameSessionFinished", gameSession);
        res.json(null);
    }
    gameSession.updatedAt = new Date();
    await gameSession.save();
    const trivia = gameSession.triviaId;
    const question = trivia.questions[gameSession.questionIndex];
    const io = req.io;
    io.emit("nextQuestion", question);
    startTimer(io,question.timer || 30);
    res.json(question);
}

/**
 * Gets the current question of a game session.
 * @param {Object} req - HTTP request object.
 * @param {string} req.params.id - The ID of the game session.
 * @param {Object} res - HTTP response object.
 * @returns {Object} The current question of the game session.
 */
const getQuestion = async (req, res) => {
    const sessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(sessionId);
    const questionIndex = gameSession.questionIndex;
    const trivia = await triviaModel.findById(gameSession.triviaId);
    console.log("trivia", trivia);
    const question = trivia.questions[questionIndex];
    console.log("question", question);
    res.json(question);
}
    /**
     * Devuelve las estad sticas de los jugadores para una pregunta en particular.
     * @param {Object} req - El objeto de solicitud de Express.
     * @param {Object} res - El objeto de respuesta de Express.
     * @returns {Promise<void>}
     */
    
const getQuestionPlayersStats = async (req, res) => {
    const sessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(sessionId).populate("players").populate("triviaId");
    const questionIndex = gameSession.questionIndex;
    const question = gameSession.triviaId.questions[questionIndex];
    const playerStats = gameSession.players.map(player => {
        const answer = player.answers.find(answer => answer.questionId.toString() === question._id.toString());
        return {
            name: player.name,
            answerId: answer?.answerId,
            correct: answer?.isCorrect,
            createdAt: answer?.createdAt,
            delay: answer?.delay
        }
    })
    // preparar los stats para poder graficar con chartjs
    const correct = playerStats.filter(player => player.correct).length;
    const incorrect = playerStats.filter(player => !player.correct).length;
    const total = playerStats.length;
    const correctPercentage = (correct / total) * 100;
    const io  = req.io;
    io.emit("questionStats", {stats:playerStats,correct,incorrect,total,correctPercentage});
    res.json({stats:playerStats,correct,incorrect,total,correctPercentage});
}

    /**
     * Devuelve las estad sticas de los jugadores de una sesi n.
     * @param {Object} req - El objeto de solicitud de Express.
     * @param {Object} res - El objeto de respuesta de Express.
     * @returns {Promise<void>}
     */
const getSessionPlayerStats = async (req, res) => {
    const sessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(sessionId).populate("players").populate("triviaId");
    const totalQuestions = gameSession.triviaId.questions.length;
    const players = gameSession.players.map(player => {
        const correct = player.answers.filter(answer => answer.isCorrect).length;
        const incorrect = player.answers.filter(answer => !answer.isCorrect).length;
        const total = player.answers.length;
        const correctPercentage = (correct / total) * 100;
        return {
            name: player.name,
            correct,
            incorrect,
            total,
            correctPercentage
        }
    })
    const correct = players.reduce((total, player) => total + player.correct, 0);
    const incorrect = players.reduce((total, player) => total + player.incorrect, 0);
    const total = players.reduce((total, player) => total + player.total, 0);
    const correctPercentage = (correct / total) * 100;
    res.json({players,totalQuestions,correct,incorrect,total,correctPercentage});
}
/**
 * Processes a player's answer for a question in a game session.
 *
 * This function retrieves the current game session and checks if the player's
 * answer is correct. It records the answer along with the time delay and updates
 * the player's data. Returns an error if the player is not found or if the question
 * has already been answered by the player.
 *
 * @param {Object} req - The request object, containing username, answerId, questionId in the body.
 * @param {Object} res - The response object used to send back the result.
 */

const answerQuestion = async (req, res) => {
    const { username, answerId, questionId } = req.body;
    const gameSessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(gameSessionId).populate("players").populate("triviaId");
    const trivia = gameSession.triviaId;
    const isCorrect = trivia.questions[gameSession.questionIndex].answers.find(answer => answer._id.toString() === answerId.toString()).isCorrect;
    const player = gameSession.players.find(player => {
        console.log("player", player.name, username);
        return player.name == username
    });
    console.log("username", username, gameSession.players, player);
    if (!player) {
        return res.status(400).json({ error: "player not found" });
    }
    if (player.answers.some(answer => answer.questionId.toString() === questionId.toString())) {
        return res.status(400).json({ error: "question already answered" });
    }
    const delay = new Date().getTime() - gameSession.updatedAt.getTime();
    player.answers.push({ questionId, answerId, isCorrect,createdAt: new Date(), delay });
    await player.save();
    res.json(player);

}

const saveSocketIdToPlayer = async(username,sessionId,socketId) => {
    const player = await playerModel.findOne({name:username,gameSessionId:sessionId});
    if(!player){
        return;
    }
    player.socketId = socketId;
    await player.save();
}

export default {
    getGameSession,
    createGameSession,
    joinPlayer,
    startGameSession,
    nextQuestion,
    getQuestion,
    answerQuestion,
    getQuestionPlayersStats,
    getSessionPlayerStats,
    saveSocketIdToPlayer

}

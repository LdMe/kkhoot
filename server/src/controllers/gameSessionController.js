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

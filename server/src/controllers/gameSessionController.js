import {customAlphabet} from "nanoid";
import gameSessionModel from "../models/gameSession.js";
import playerModel from "../models/player.js";
import triviaModel from "../models/trivia.js";


const getGameSession = async (req,res)=>{
    const id = req.params.id;
    const gameSession = await gameSessionModel.findById(id);
    res.json(gameSession);
}
const getRandomCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
const createGameSession = async (req,res)=>{
    const triviaId = req.params.id;
    // primero borramos las sesiones anteriores para el mismo trivia (asi evitamos duplicados)
    await gameSessionModel.deleteMany({triviaId});
    const gameSession = new gameSessionModel({triviaId,code:getRandomCode()});
    await gameSession.save();
    res.json(gameSession);
}

const joinPlayer = async(req,res)=>{
    const username = req.body.username;
    const sessionCode= req.params.id;
    const gameSession = await gameSessionModel.findOne({code:sessionCode}).populate("players");
    console.log("gameSession",sessionCode,gameSession);
    if(gameSession.players.some(player => player.name === username)){
        return res.status(400).json({error:"username already exists"});
    }
    const newPlayer = new playerModel({name:username,gameSessionId:gameSession._id})
    await newPlayer.save();
    gameSession.players.push(newPlayer);
    await gameSession.save();
    res.json(newPlayer);

}

const startGameSession = async (req,res)=> {
    const sessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(sessionId);
    gameSession.state = "started";
    await gameSession.save();
    res.json(gameSession);
}

const nextQuestion = async (req,res) => {
    const sessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(sessionId);
    gameSession.questionIndex++;
    await gameSession.save();
    res.json(gameSession);
}

const getQuestion = async (req,res)=>{
    const sessionId = req.params.id;
    const gameSession = await gameSessionModel.findById(sessionId);
    const questionIndex = gameSession.questionIndex;
    const trivia = await triviaModel.findById(gameSession.triviaId);
    const question = trivia.questions[questionIndex];
    res.json(question);
}

export default {
    getGameSession,
    createGameSession,
    joinPlayer,
    startGameSession,
    nextQuestion,
    getQuestion

}

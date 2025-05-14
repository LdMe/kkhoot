import triviaModel from "../models/trivia.js";

const getTrivias = async (req, res) => {
    const owner = req.user?._id;

    const trivias = await triviaModel.find({
        owner
    });
    res.json(trivias);
}

const getTriviaById = async (req, res) => {
    const id = req.params.id;
    const trivia = await triviaModel.findById(id);
    res.json(trivia);
}
const createTrivia = async (req, res) => {
    const data = req.body;
    const owner = req.user._id;

    console.log("new trivia",data);
    data.owner = owner;
    const trivia = new triviaModel(data);
    await trivia.save();
    res.json(trivia);
}

const updateTrivia = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const trivia = await triviaModel.findByIdAndUpdate(id, data);
    res.json(trivia);
}

const deleteTrivia = async (req, res) => {
    const id = req.params.id;
    const trivia = await triviaModel.findByIdAndDelete(id);
    res.json(trivia);
}

export default {
    getTrivias,
    getTriviaById,
    createTrivia,
    updateTrivia,
    deleteTrivia
}

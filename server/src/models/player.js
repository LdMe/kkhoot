import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    questionIndex: {
        type: Number,
        required: true
    },
    answerIndex: {
        type: Number,
        required:true
    }
});

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gameSessionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "GameSession",
        required: true
    },
    answers: [answerSchema]
});

const playerModel = mongoose.model("Player", playerSchema);

export default playerModel;
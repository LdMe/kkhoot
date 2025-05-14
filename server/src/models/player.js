import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    delay: {
        type: Number,
        default: 0
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
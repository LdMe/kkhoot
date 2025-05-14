import mongoose from "mongoose";

const gameSessionSchema = new mongoose.Schema({
    triviaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trivia",
        required: true
    },
    code : {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ["pending", "started", "finished"],
        default: "pending"
    },
    questionIndex: {
        type: Number,
        default: 0
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: false
        }
    ]
});

const gameSessionModel = mongoose.model("GameSession", gameSessionSchema);

export default gameSessionModel;
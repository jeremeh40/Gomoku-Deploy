import mongoose from "mongoose";

export interface GameDocument extends Document {
    gameId: string;
    gameBoard: [[string]];
    turnOrder: [string];
    winner: string;
    createdAt: Date;


}

const GameSchema = new mongoose.Schema({
    gameId: String,
    gameBoard: [[String]],
    turnOrder: [String],
    winner: String,
    createdAt: {
        type: Date,
        default: Date.now
    }




})

export default mongoose.model<GameDocument>("Game", GameSchema)




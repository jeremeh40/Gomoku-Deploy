import mongoose from "mongoose";

export interface GameDocument extends Document {
    gameBoard: [[string]];
    turnOrder: [string];
    winner: string;
    createdAt: string;


}

const GameSchema = new mongoose.Schema({
    gameBoard: [[String]],
    turnOrder: [String],
    winner: String,
    createdAt: {
        type: String,
        default: Date.now.toString()
    }




})

export default mongoose.model<GameDocument>("Game", GameSchema)




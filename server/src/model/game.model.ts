import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface GameDocument extends Document {
    userId: UserDocument["_id"]
    gameBoard: [[string]];
    turnOrder: [string];
    winner: string;
    createdAt: string;


}

const GameSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    gameBoard: [[String]],
    turnOrder: [String],
    winner: String,
    createdAt: {
        type: String,
        default: Date.now.toString()
    }




})

export default mongoose.model<GameDocument>("Game", GameSchema)




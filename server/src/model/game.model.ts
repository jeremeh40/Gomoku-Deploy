import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface GameDocument extends Document {
    userId: UserDocument["_id"]
    gameBoard: string[][];
    turnOrder: string[];
    winner: string;
    createdAt?: Date;


}

const GameSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    gameBoard: [[String]],
    turnOrder: [String],
    winner: String, },
    {timestamps:true})

export default mongoose.model<GameDocument>("Game", GameSchema)




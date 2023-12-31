/* Functions to interact with the dataBase in regards to game objects */

import mongoose from "mongoose";
import gameModel, { GameDocument } from "../model/game.model";

export async function getAllGames(userId: string) {   

    return await gameModel.find()
}

export async function getGamebyId(_id: string, userId: string){
    return await gameModel.findById(_id).lean()
}

export async function createGame(input: Partial<GameDocument>) {
    return gameModel.create(input)
}




export async function updateGame(id: string, userId: string, data: Partial<GameDocument>){
    try{
        const updatedGame = await gameModel.findByIdAndUpdate(id, data, {new: true, runValidators:true})

        return updatedGame
    }
    catch(err){
        console.log("error updating games")

    }

}


export async function deleteGame(id: string, userId:string){
    try{
        return gameModel.deleteOne({
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId)
        })
    }
    catch(err){
        console.log(err)

    }
}
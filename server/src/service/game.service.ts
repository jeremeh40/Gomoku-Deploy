
import gameModel, { GameDocument } from "../model/game.model";

export async function getAllGames() {

    return await gameModel.find()
}

export async function getGamebyId(id: string){
    return await gameModel.findById(id).lean()
}

export async function createGame(input: Partial<GameDocument>) {
    return gameModel.create(input)
}
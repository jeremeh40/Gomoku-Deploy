/* Schema to be validated to ensure correct game credentials are being received from front end*/

import {string, object, TypeOf, array, number} from 'zod'

const updateGamePayload = {
    body: object({
        pieceCoordinate: string({required_error: 'Piece coordinate is required'}).nonempty(),
        turnOrder: array(string({ required_error: 'turnOrder is required'})).nonempty(),
        currentPlayer: string({required_error: "current player is required"}),
    })
}

const createGamePayload = {
    body: object({
        boardSize: number({required_error: "boardSize is required"})
    })
}

const getParams = {
    params: object({
        _id: string({
            required_error: "Game Id is required"
        })
    })
}

export const createGameSchema = object({
    ...createGamePayload
})

export const getGameByIdSchema = object({
    ...getParams
})

export const updateGameSchema = object({
    ...updateGamePayload,
    ...getParams    

})

export const deleteGameSchema = object({
    ...getParams
})

export type CreateGameInput = TypeOf<typeof createGameSchema>
export type ReadGameInput = TypeOf<typeof getGameByIdSchema>
export type UpdateGameInput = TypeOf<typeof updateGameSchema>
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>

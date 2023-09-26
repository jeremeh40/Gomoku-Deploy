import {string, object, TypeOf, array} from 'zod'

const payload = {
    body: object({
        gameBoard: array(array(string({required_error: 'Game Board is required'}))).nonempty(),
        turnOrder: array(string({ required_error: 'turnOrder is required'})).nonempty(),
        winner: string({required_error: "winner is required"}),
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
    ...payload
})



export const getGameByIdSchema = object({
    ...getParams
})

export const updateGameSchema = object({
    ...payload,
    ...getParams    

})

export const deleteGameSchema = object({
    ...getParams
})

export type CreateGameInput = TypeOf<typeof createGameSchema>
export type ReadGameInput = TypeOf<typeof getGameByIdSchema>
export type UpdateGameInput = TypeOf<typeof updateGameSchema>
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>

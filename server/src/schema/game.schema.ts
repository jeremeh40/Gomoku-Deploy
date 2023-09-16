import {string, object, TypeOf, array, date } from 'zod'

const payload = {
    body: object({
        gameId: string({required_error: "Game Id is required"}),
        gameBoard: array(array(string({required_error: 'Game Board is required'}))).nonempty(),
        turnOrder: array(string({ required_error: 'turnOrder is required'})).nonempty(),
        winner: string({required_error: "winner is required"}),
        createdAt: date({required_error: "Date is required"})
    })
}

const getParams = {
    params: object({
        gameId: string({
            required_error: "Game Id is required"
        })
    })
}

export const createGameSchema = object({
    ...payload
})

export const getBookingSchema = object({
    ...getParams
})

export type CreateGameInput = TypeOf<typeof createGameSchema>
export type ReadGameInput = TypeOf<typeof getBookingSchema>

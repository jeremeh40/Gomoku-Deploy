/* Schema to be validated to ensure correct user credentials are being received from front end*/

import {string, object, TypeOf } from 'zod'

const payload = {
    body: object ({
        username: string({required_error: 'Username is required'}),
        password: string({required_error: 'Password is required'}),
    }),
}

export const registerSchema = object({
    ...payload,
})

export const loginSchema = object({
    ...payload,

})

export type RegisterInput = TypeOf<typeof registerSchema>

export type LoginInput = TypeOf<typeof loginSchema>
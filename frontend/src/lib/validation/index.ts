import * as z from 'zod'

export const SignUpValidation = z.object({
    name: z.string().min(2, { message: 'Name must have at least 2 characters' }),
    username: z
        .string()
        .min(2, { message: 'Username must have at least 2 characters' }),
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: 'Password must have at least 8 characters' }),
})

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: 'Password must have at least 8 characters' }),
})
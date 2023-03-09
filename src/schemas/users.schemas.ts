import { hashSync } from "bcryptjs";
import { z } from "zod";

export const userCreateSchema = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120).transform((pass) => {
        return hashSync(pass, 10)
    }),
    admin: z.boolean().default(false)
})

export const userInfoSchema = userCreateSchema.extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable()
}).omit({ password: true })

export const userInfoArraySchema = userInfoSchema.array()
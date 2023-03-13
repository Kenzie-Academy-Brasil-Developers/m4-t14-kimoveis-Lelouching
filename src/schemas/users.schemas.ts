import { hashSync } from "bcryptjs";
import { z } from "zod";

export const userCreateSchema = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120),
    admin: z.boolean().default(false)
})

export const userUpdateSchema = userCreateSchema.omit({ admin: true }).partial()

export const userInfoSchema = userCreateSchema.extend({
    id: z.number(),
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string()),
    deletedAt: z.date().or(z.string()).nullable()
}).omit({ password: true })

export const userInfoArraySchema = userInfoSchema.array()

export const userInfoScheduleSchema = userInfoSchema.extend({
    password: z.string()
})
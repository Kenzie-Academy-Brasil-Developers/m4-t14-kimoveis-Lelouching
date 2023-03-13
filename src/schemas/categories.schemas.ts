import { z } from "zod";

export const categoryCreateSchema = z.object({
    name: z.string().max(45)
})

export const categoryInfoSchema = categoryCreateSchema.extend({
    id: z.number()
})
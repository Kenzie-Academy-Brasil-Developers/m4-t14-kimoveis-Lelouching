import { z } from "zod";

export const categoryCreateSchema = z.object({
    name: z.string().max(45)
})
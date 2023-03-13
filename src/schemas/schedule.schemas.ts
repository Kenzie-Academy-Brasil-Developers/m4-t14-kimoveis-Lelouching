import { userInfoScheduleSchema } from "./users.schemas"
import { z } from "zod";

export const scheduleCreateSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number().int()
})

export const scheduleUserArray = scheduleCreateSchema.omit({ realEstateId: true }).extend({
    id: z.number(),
    user: userInfoScheduleSchema
}).array()
import { categoryInfoSchema } from "./categories.schemas"
import { z } from "zod";
import { addressCreateSchema, addressInfoSchema } from "./address.schemas";
import { scheduleUserArray } from "./schedule.schemas";

export const realEstateCreateSchema = z.object({
    value: z.number().positive().or(z.string()),
    size: z.number().int().positive(),
    address: addressCreateSchema,
    categoryId: z.number().int().positive()
})

export const realEstateInfoSchema = realEstateCreateSchema.omit({ address: true, categoryId: true })

export const realEstateSchedulesSchema = realEstateInfoSchema.extend({
    id: z.number(),
    sold: z.boolean(),
    address: addressInfoSchema,
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string()),
    category: categoryInfoSchema.nullish(),
    schedules: scheduleUserArray
})

export const realEstateCreateReturnSchema = realEstateSchedulesSchema.omit({ category: true, schedules: true })
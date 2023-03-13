import { scheduleCreateSchema } from "./../schemas/schedule.schemas"
import { z } from "zod";

export type iScheduleCreate = z.infer<typeof scheduleCreateSchema>
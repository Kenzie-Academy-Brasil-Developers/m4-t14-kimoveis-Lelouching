import { ifIsAdmin } from "./../middlewares/ifIsAdmin.middlewares"
import { validateToken } from "./../middlewares/validateToken.middlewares"
import { validateBody } from "./../middlewares/validateBody.middlewares"
import { createScheduleController, getAllSchedulesFromARealEstateController } from "./../controllers/schedules.controllers"
import { Router } from "express"
import { scheduleCreateSchema } from "../schemas/schedule.schemas"

export const schedulesRoute: Router = Router()

schedulesRoute.post("", validateToken, validateBody(scheduleCreateSchema), createScheduleController)
schedulesRoute.get("/realEstate/:id", validateToken, ifIsAdmin, getAllSchedulesFromARealEstateController)
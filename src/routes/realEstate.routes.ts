import { validateToken } from "./../middlewares/validateToken.middlewares"
import { realEstateCreateSchema } from "./../schemas/realEstate.schemas"
import { validateBody } from "./../middlewares/validateBody.middlewares"
import { Router } from "express"
import { createRealEstateController, getAllRealEstateControllers } from "../controllers/realEstate.controllers"
import { ifIsAdmin } from "../middlewares/ifIsAdmin.middlewares"
import { ifCategoryIdExists } from "../middlewares/ifCategoryIdExists.middlewares"

export const realEstateRoute: Router = Router()

realEstateRoute.post("", validateBody(realEstateCreateSchema), ifCategoryIdExists, validateToken, ifIsAdmin, createRealEstateController)
realEstateRoute.get("", getAllRealEstateControllers)
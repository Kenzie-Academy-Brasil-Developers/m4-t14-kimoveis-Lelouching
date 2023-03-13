import { createCategoryController, getAllCategoriesController, getAllRealEstatesByCategoryController } from "./../controllers/categories.controllers"
import { validateToken } from "./../middlewares/validateToken.middlewares"
import { validateBody } from "./../middlewares/validateBody.middlewares"
import { Router } from "express"
import { categoryCreateSchema } from "../schemas/categories.schemas"
import { ifIsAdmin } from "../middlewares/ifIsAdmin.middlewares"
import { ifCategoryExists } from "../middlewares/ifCategoryExists.middlewares"
import { ifCategoryIdExists } from "../middlewares/ifCategoryIdExists.middlewares"

export const categoriesRoute: Router = Router()

categoriesRoute.post("", validateBody(categoryCreateSchema), ifCategoryExists, validateToken, ifIsAdmin, createCategoryController)
categoriesRoute.get("/:id/realEstate", ifCategoryIdExists, getAllRealEstatesByCategoryController)
categoriesRoute.get("", getAllCategoriesController)
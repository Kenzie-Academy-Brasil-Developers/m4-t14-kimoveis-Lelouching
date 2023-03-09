import { validateBody } from "./../middlewares/validateBody.middlewares"
import { Router } from "express"
import { userLoginSchema } from "../schemas/login.schemas"
import { loginUser } from "../controllers/login.controllers"

export const loginRoute: Router = Router()

loginRoute.post("", validateBody(userLoginSchema), loginUser)
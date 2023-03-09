import { ifIdExists } from "./../middlewares/ifIdExists.middlewares"
import { validateToken } from "./../middlewares/validateToken.middlewares"
import { createUserController, deleteUserController, getAllUsersController, updateUserController } from "./../controllers/users.controllers"
import { Router } from "express"
import { validateBody } from "../middlewares/validateBody.middlewares"
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schemas"
import { ifEmailExists } from "../middlewares/ifEmailExists.middlewares"
import { ifIsAdmin } from "../middlewares/ifIsAdmin.middlewares"
import { ifHasPermission } from "../middlewares/ifHasPermission.middlewares"

export const usersRoute: Router = Router()

usersRoute.post("", validateBody(userCreateSchema), ifEmailExists, createUserController)
usersRoute.get("", validateToken, ifIsAdmin, getAllUsersController)
usersRoute.delete("/:id", ifIdExists, validateToken, ifIsAdmin, deleteUserController)
usersRoute.patch("/:id", validateBody(userUpdateSchema), ifEmailExists, ifIdExists, validateToken, ifHasPermission, updateUserController)
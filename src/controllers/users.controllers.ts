import { createUserService } from "../services/users/createUser.service"
import { Request, Response } from "express"
import { iUserInfo } from "../interfaces/users.interfaces"
import { getAllUsersService } from "../services/users/getAllUsers.service"
import { deleteUserService } from "../services/users/deleteUser.service"

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const createUser: iUserInfo = await createUserService(req.body)
    
    return res.status(201).json(createUser)
}

export const getAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users: iUserInfo[] = await getAllUsersService()
    
    return res.status(200).json(users)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    await deleteUserService(Number(req.params.id))

    return res.status(204).send()
}
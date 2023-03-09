import { getUserByIdService } from "./../services/users/getUserById.service"
import { iUserInfo } from "./../interfaces/users.interfaces"
import { NextFunction, Request, Response } from "express";

export const ifIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const id: number = Number(req.params.id)

    const user: iUserInfo | null = await getUserByIdService(id)

    if(!user){
        return res.status(404).json({
            message: "User not found!"
        })
    }

    if(req.method === "DELETE" && user.deletedAt){
        return res.status(400).json({
            message: "User already deleted!"
        })
    }

    req.userId = user

    return next()
}
import { getUserByEmailService } from "../services/users/getUserByEmail.service"
import { NextFunction, Request, Response } from "express"
import { iUserInfo } from "../interfaces/users.interfaces"

export const ifEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const { email } = req.body

    const verifyIfEmailExists: iUserInfo | null = await getUserByEmailService(email)

    if(verifyIfEmailExists){
        return res.status(409).json({
            message: "Email already exists"
        })
    }

    return next()
}
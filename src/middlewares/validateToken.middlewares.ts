import { validateTokenService } from "../services/users/validateToken.service"
import { NextFunction, Request, Response } from "express";
import { iUserInfo } from "../interfaces/users.interfaces";

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    if(!req.headers.authorization){
        return res.status(401).json({ 
            message: "Missing token authorization" 
        })
    }

    const user: iUserInfo = await validateTokenService(req.headers.authorization)

    req.userToken = user

    return next()
}
import { NextFunction, Request, Response } from "express"

export const ifIsAdmin = (req: Request, res: Response, next: NextFunction): void | Response => {
    if(!req.userToken.admin){
        return res.status(401).json({
            message: "You are not an admin"
        })
    }

    return next()
}
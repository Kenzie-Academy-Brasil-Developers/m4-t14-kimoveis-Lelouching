import { NextFunction, Request, Response } from "express"

export const ifIsAdmin = (req: Request, res: Response, next: NextFunction): void | Response => {
    if(!req.userToken.admin){
        return res.status(403).json({
            message: "Insufficient permission"
        })
    }

    return next()
}
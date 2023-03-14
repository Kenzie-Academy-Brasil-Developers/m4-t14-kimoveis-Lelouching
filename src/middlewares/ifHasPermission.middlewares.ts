import { AppError } from "./../errors"
import { NextFunction, Request, Response } from "express";

export const ifHasPermission = (req: Request, res: Response, next: NextFunction): void | Response => {
    if(req.userId.id == req.userToken.id){
        return next()
    }

    if(!req.userToken.admin && req.userId.id !== req.userToken.id){
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}
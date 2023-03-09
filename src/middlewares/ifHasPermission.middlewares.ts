import { AppError } from "./../errors"
import { NextFunction, Request, Response } from "express";

export const ifHasPermission = (req: Request, res: Response, next: NextFunction): void | Response => {
    if(!req.userToken.admin && req.userId.id !== req.userToken.id){
        throw new AppError("Insufficient permissions", 403)
    }

    return next()
}
import "dotenv/config"
import { verify } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    if(!req.headers.authorization){
        return res.status(401).json({ 
            message: "Missing bearer token" 
        })
    }

    const token: string = req.headers.authorization.split(" ")[1]

    await verify(
        token,
        String(process.env.SECRET_KEY),
        async (error: any, decoded: any): Promise<void | Response> => {
            if(error) {
                return res.status(401).json({ 
                    message: error.message 
                })
            }

            req.userToken = {
                id: decoded.id,
                email: decoded.email,
                admin: decoded.admin,
                deletedAt: decoded.deletedAt
            }
        }
    )

    return next()
}
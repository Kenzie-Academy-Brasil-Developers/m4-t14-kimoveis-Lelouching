import "dotenv/config"
import { iUser } from "./../../interfaces/users.interfaces"
import { verify } from "jsonwebtoken"
import { AppError } from "../../errors"

export const validateTokenService = async (authToken: string): Promise<iUser> => {
    const token: string = authToken.split(" ")[1]

    let userValidated: iUser| null = null

    await verify(
        token,
        String(process.env.SECRET_KEY),
        async (error: any, decoded: any): Promise<void> => {
            if(error) {
                throw new AppError(error.message, 401)
            }

            userValidated = {
                id: decoded.id,
                email: decoded.email,
                admin: decoded.admin,
                deletedAt: decoded.deletedAt
            }
        }
    )

    return userValidated!
}
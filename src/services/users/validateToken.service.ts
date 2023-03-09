import { verify } from "jsonwebtoken"
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { AppError } from "../../errors"
import { userInfoSchema } from "../../schemas/users.schemas"
import { iUserInfo } from "../../interfaces/users.interfaces"

export const validateTokenService = async (authToken: string): Promise<iUserInfo> => {
    const token: string = authToken.split(" ")[1]

    const userValidated: iUserInfo[] = []

    await verify(
        token,
        String(process.env.SECRET_KEY),
        async (error: any, decoded: any): Promise<void> => {
            if(error) {
                throw new AppError(error.message, 401)
            }

            const userRepo: Repository<User> = AppDataSource.getRepository(User)

            const user: User | null = await userRepo.createQueryBuilder().
            select().
            where("LOWER(email) = :email", { email: decoded.email }).
            getOne()

            if(!user) return

            userValidated.push(await userInfoSchema.parse(user))
        }
    )

    return userValidated[0]
}
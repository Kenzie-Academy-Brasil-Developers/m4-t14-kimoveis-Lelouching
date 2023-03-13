import "dotenv/config"
import { AppDataSource } from "./../../data-source"
import { sign } from "jsonwebtoken"
import { Repository } from "typeorm"
import { User } from "../../entities"
import { iUserLogin } from "./../../interfaces/login.interfaces"
import { AppError } from "../../errors"
import { compare } from "bcryptjs"

export const loginUserService = async (userLogin: iUserLogin): Promise<string> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepo.findOneBy({
        email: userLogin.email
    })

    if(!user){
        throw new AppError("Invalid credentials", 401)
    }

    const comparePassword: boolean = await compare(userLogin.password, user.password)
    
    if(!comparePassword){
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = sign(
        {
            id: user.id,
            email: user.email,
            admin: user.admin,
            deletedAt: user.deletedAt
        },
        String(process.env.SECRET_KEY),
        {
            expiresIn: "24h",
            subject: String(user.id)
        }
    )

    return token
}
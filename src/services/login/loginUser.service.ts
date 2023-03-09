import { AppDataSource } from "./../../data-source"
import { sign } from "jsonwebtoken"
import { Repository } from "typeorm"
import { User } from "../../entities"
import { iUserLogin } from "./../../interfaces/login.interfaces"
import { AppError } from "../../errors"
import { compare } from "bcryptjs"

export const loginUserService = async (userLogin: iUserLogin): Promise<string> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepo.createQueryBuilder().
    select().
    where("LOWER(email) = :email", { email: userLogin.email.toLowerCase() }).
    withDeleted().
    getOne()

    if(!user){
        throw new AppError("Email or password invalid!", 401)
    }

    if(user.deletedAt){
        throw new AppError("Your account is disabled!", 403)
    }

    const comparePassword: boolean = await compare(userLogin.password, user.password)
    
    if(!comparePassword){
        throw new AppError("Email or password invalid!", 401)
    }

    const token: string = sign(
        {
            email: userLogin.email
        },
        String(process.env.SECRET_KEY),
        {
            expiresIn: "24h",
            subject: String(user?.id)
        }
    )

    return token
}
import { iUserInfo } from "./../../interfaces/users.interfaces"
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { userInfoSchema } from "../../schemas/users.schemas"

export const getUserByEmailService = async (email: string): Promise<null | iUserInfo> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepo.createQueryBuilder().
    select().
    withDeleted().
    where("LOWER(email) = :email", { email: email.toLowerCase() }).
    getOne()

    return await userInfoSchema.nullable().parse(user)
}
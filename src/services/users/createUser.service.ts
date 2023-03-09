import { AppDataSource } from "../../data-source"
import { InsertResult, Repository } from "typeorm"
import { User } from "../../entities"
import { iUserCreate, iUserInfo } from "../../interfaces/users.interfaces"
import { userInfoSchema } from "../../schemas/users.schemas"

export const createUserService = async (userRequest: iUserCreate): Promise<iUserInfo> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: InsertResult = await userRepo.createQueryBuilder().
    insert().
    values(userRequest).
    returning("*").
    execute()

    return await userInfoSchema.parse(user.raw[0])
}
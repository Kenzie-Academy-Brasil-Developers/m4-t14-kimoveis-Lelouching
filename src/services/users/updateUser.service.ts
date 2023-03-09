import { userInfoSchema } from "./../../schemas/users.schemas"
import { AppDataSource } from "./../../data-source"
import { Repository, UpdateResult } from "typeorm"
import { User } from "../../entities"
import { iUserInfo } from "./../../interfaces/users.interfaces"

export const updateUserService = async (body: any, id: number): Promise<iUserInfo> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: UpdateResult = await userRepo.createQueryBuilder().
    update().
    set(body).
    where("id = :id", { id: id }).
    returning("*").
    execute()

    return await userInfoSchema.parse(user.raw[0])
}
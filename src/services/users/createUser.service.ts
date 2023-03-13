import { AppDataSource } from "../../data-source"
import { Repository } from "typeorm"
import { User } from "../../entities"
import { iUserCreate, iUserInfo } from "../../interfaces/users.interfaces"
import { userInfoSchema } from "../../schemas/users.schemas"

export const createUserService = async (userRequest: iUserCreate): Promise<iUserInfo> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User = userRepo.create(userRequest)

    await userRepo.save(user)

    return await userInfoSchema.parse(user)
}
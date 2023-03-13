import { userInfoSchema } from "./../../schemas/users.schemas"
import { AppDataSource } from "./../../data-source"
import { Repository, DeepPartial } from "typeorm"
import { User } from "../../entities"
import { iUserInfo } from "./../../interfaces/users.interfaces"

export const updateUserService = async (body: DeepPartial<User>, id: number): Promise<iUserInfo> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const findUser = await userRepo.findOneBy({
        id: id
    })

    const newUser = userRepo.create({
        ...findUser,
        ...body
    })

    await userRepo.save(newUser)

    const user: iUserInfo = userInfoSchema.parse(newUser)

    return user
}
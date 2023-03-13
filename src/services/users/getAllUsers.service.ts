import { AppDataSource } from "../../data-source"
import { Repository } from "typeorm"
import { User } from "../../entities";
import { iUserInfo } from "../../interfaces/users.interfaces";
import { userInfoArraySchema } from "../../schemas/users.schemas";

export const getAllUsersService = async (): Promise<iUserInfo[]> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const users: User[] = await userRepo.find({
        withDeleted: true
    })

    return userInfoArraySchema.parse(users)
}
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { userInfoSchema } from "../../schemas/users.schemas"

export const getUserByIdService = async (id: number) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepo.createQueryBuilder().
    select().
    withDeleted().
    where("id = :id", { id: id }).
    getOne()

    return await userInfoSchema.nullable().parse(user)
}
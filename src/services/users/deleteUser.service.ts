import { AppDataSource } from "./../../data-source"
import { Repository } from "typeorm"
import { User } from "../../entities"

export const deleteUserService = async (userid: number): Promise<void> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    await userRepo.createQueryBuilder().
    softDelete().
    where("id = :id", { id: userid }).
    execute()
}
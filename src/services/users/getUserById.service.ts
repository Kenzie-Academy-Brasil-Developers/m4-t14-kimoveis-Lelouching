import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { AppError } from "../../errors"
import { iUser } from "../../interfaces/users.interfaces"
import { userInfoSchema } from "../../schemas/users.schemas"

export const getUserByIdService = async (id: number): Promise<iUser | null> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepo.findOne({
        where: {
            id: id
        },
        withDeleted: true
    })

    if(!user){
        throw new AppError("User not found", 404)
    }

    const validatedUser: iUser = {
        id: user?.id,
        email: user?.email,
        admin: user?.admin,
        deletedAt: user?.deletedAt
    }

    return validatedUser
}
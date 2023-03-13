import { AppDataSource } from "./../../data-source"
import { Repository } from "typeorm";
import { Category } from "../../entities";

export const getCategoryByIdService = async (id: number): Promise<Category | null> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category | null = await categoryRepo.findOneBy({
        id: id
    })

    return category
}
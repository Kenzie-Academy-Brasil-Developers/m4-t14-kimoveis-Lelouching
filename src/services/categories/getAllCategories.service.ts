import { AppDataSource } from "./../../data-source"
import { Repository } from "typeorm";
import { Category } from "../../entities";

export const getAllCategoriesService = async (): Promise<Category[]> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)

    const categories = await categoryRepo.createQueryBuilder().
    select().
    getMany()

    return categories
}
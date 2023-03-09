import { InsertResult, Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"

export const createCategoryService = async (categoryName: string): Promise<Category> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)

    const category: InsertResult = await categoryRepo.createQueryBuilder().
    insert().
    values({ name: categoryName }).
    returning("*").
    execute()

    return category.raw[0]
}
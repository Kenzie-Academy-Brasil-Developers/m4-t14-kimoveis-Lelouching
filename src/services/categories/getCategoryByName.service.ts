import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";

export const getCategoryByNameService = async (categoryName: string): Promise<Category | null> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category | null = await categoryRepo.findOneBy({
        name: categoryName
    })
    
    return category
}
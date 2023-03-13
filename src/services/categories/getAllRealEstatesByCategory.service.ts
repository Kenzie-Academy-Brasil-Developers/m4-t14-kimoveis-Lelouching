import { AppDataSource } from "../../data-source"
import { Repository } from "typeorm";
import { Category, RealEstate } from "../../entities";
import { iCategoryRealEstates } from "../../interfaces/categories.interfaces";

export const getAllRealEstatesByCategoryService = async (categoryBody: Category): Promise<iCategoryRealEstates> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstates = await realEstateRepo.findBy({
        category: categoryBody
    })

    return {
        ...categoryBody,
        realEstate: realEstates
    }
}
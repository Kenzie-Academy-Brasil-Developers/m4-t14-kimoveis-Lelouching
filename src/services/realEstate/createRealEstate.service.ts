import { AppDataSource } from "./../../data-source"
import { Address } from "./../../entities/adresses.entities"
import { iRealEstateInfo } from "../../interfaces/realEstate.interfaces";
import { InsertResult, Repository } from "typeorm";
import { Category, RealEstate } from "../../entities";
import { realEstateCreateReturnSchema } from "../../schemas/realEstate.schemas";

export const createRealEstateService = async (realEstateBody: iRealEstateInfo, addressBody: Address, category: Category): Promise<RealEstate> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstate: RealEstate = realEstateRepo.create({...realEstateBody, category: category, address: addressBody})

    await realEstateRepo.save(realEstate)

    return realEstate
}
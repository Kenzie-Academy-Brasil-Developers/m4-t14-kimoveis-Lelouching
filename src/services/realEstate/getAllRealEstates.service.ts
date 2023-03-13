import { Repository } from "typeorm"
import { AppDataSource } from "./../../data-source"
import { RealEstate } from "../../entities";

export const getAllRealEstatesService = async (): Promise<RealEstate[]> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstates: RealEstate[] = await realEstateRepo.find({
        relations: {
            address: true
        }
    })

    return await realEstates.map((realEstate) => {
        const valueFixed: number = Number(realEstate.value)
        realEstate.value = String(valueFixed.toFixed(2))
        return realEstate
    })
}
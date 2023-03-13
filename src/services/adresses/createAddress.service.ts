import { AppDataSource } from "./../../data-source"
import { InsertResult, Repository } from "typeorm";
import { Address } from "../../entities";
import { iAddressCreate } from "../../interfaces/address.interfaces";
import { AppError } from "../../errors";

export const createAddressService = async (addressBody: iAddressCreate): Promise<Address> => {
    const addressRepo: Repository<Address> = AppDataSource.getRepository(Address)

    const ifAddressExists: Address | null = await addressRepo.createQueryBuilder().
    select().
    where(addressBody).
    getOne()
    
    if(ifAddressExists){
        throw new AppError("Address already exists", 409)
    }

    const address: Address = await addressRepo.save(addressBody)

    await addressRepo.save(address)
    
    return address
}
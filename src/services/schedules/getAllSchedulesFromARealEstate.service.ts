import { realEstateSchedulesSchema } from "./../../schemas/realEstate.schemas"
import { scheduleUserArray } from "./../../schemas/schedule.schemas"
import { RealEstate } from "./../../entities/realEstate.entities"
import { AppDataSource } from "../../data-source"
import { Repository } from "typeorm"
import { Schedule } from "../../entities/schedulesUsersProperties.entities"
import { AppError } from "../../errors"
import { User } from "../../entities"

export const getAllSchedulesFromARealEstateService = async (realEstateId: number): Promise<any> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const scheduleRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule)

    const realEstate: RealEstate | null = await realEstateRepo.findOne({
        where: {
            id: realEstateId
        },
        relations: {
            category: true,
            address: true
        }
    })

    if(!realEstate){
        throw new AppError("RealEstate not found", 404)
    }

    const schedule = await scheduleRepo.find({
        where: {
            realEstate: {
                id: realEstate.id
            }
        },
        relations: {
            user: true
        }
    })

    return {
        ...realEstate,
        schedules: schedule
    }
}
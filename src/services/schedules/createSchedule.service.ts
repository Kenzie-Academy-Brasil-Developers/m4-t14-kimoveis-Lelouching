import { User } from "./../../entities/users.entities"
import { iUser } from "./../../interfaces/users.interfaces"
import { Repository } from "typeorm"
import { AppError } from "./../../errors"
import { RealEstate } from "./../../entities/realEstate.entities"
import { Schedule } from "./../../entities/schedulesUsersProperties.entities"
import { AppDataSource } from "./../../data-source"
import { iScheduleCreate } from "./../../interfaces/schedule.interfaces"

export const createScheduleService = async (requestBody: iScheduleCreate, user: iUser): Promise<any> => {
    const repoSchedule: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const repoRealEstate: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    
    const userWeekDay: number = new Date(requestBody.date).getDay()
    const userHour: number = Number(`${requestBody.hour.at(0)!}${requestBody.hour.at(1)!}`)

    if(userWeekDay === 0 || userWeekDay === 6){
        throw new AppError("Invalid date, work days are monday to friday", 400)
    }

    if(userHour < 8 || userHour > 18){
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400)
    }

    const ifRealEstateExists: RealEstate | null = await repoRealEstate.findOneBy({
        id: requestBody.realEstateId
    })

    if(!ifRealEstateExists){
        throw new AppError("RealEstate not found", 404)
    }

    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const userSchedule: User | null = await userRepo.findOneBy({
        id: user.id
    })

    const { date, hour } = requestBody

    const schedule: Schedule = repoSchedule.create({date: date, hour: hour, realEstate: ifRealEstateExists, user: userSchedule!})

    const verifyIfScheduleAlreadyExists: Schedule | null = await repoSchedule.createQueryBuilder("schedule").
    where("schedule.userId = :id", { id: userSchedule?.id }).
    andWhere("schedule.date = :date", { date: schedule.date }).
    andWhere("schedule.hour = :hour", { hour: schedule.hour }).
    getOne()

    if(verifyIfScheduleAlreadyExists){
        throw new AppError( "User schedule to this real estate at this date and time already exists", 409)
    }

    const scheduleIfExists: Schedule | null = await repoSchedule.createQueryBuilder("schedule").
    where("schedule.realEstateId = :id", {  id: requestBody.realEstateId}).
    andWhere("schedule.date = :date", { date: requestBody.date }).
    andWhere("schedule.hour = :hour", { hour: requestBody.hour }).
    getOne()

    if(scheduleIfExists){
        throw new AppError("Schedule to this real estate at this date and time already exists", 409)
    }

    await repoSchedule.save(schedule)
}
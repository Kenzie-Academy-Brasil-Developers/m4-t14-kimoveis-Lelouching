import { iUser } from "./../interfaces/users.interfaces"
import { createScheduleService } from "./../services/schedules/createSchedule.service"
import { User } from "./../entities/users.entities"
import { Request, Response } from "express";
import { Schedule } from "../entities";
import { getAllSchedulesFromARealEstateService } from "../services/schedules/getAllSchedulesFromARealEstate.service";
import { request } from "http";

export const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
    const user: iUser = req.userToken

    await createScheduleService(req.body, user)
    
    return res.status(201).json({
        message: "Schedule created"
    })
}

export const getAllSchedulesFromARealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id)

    const schedules = await getAllSchedulesFromARealEstateService(id)

    return res.status(200).json(schedules)
}
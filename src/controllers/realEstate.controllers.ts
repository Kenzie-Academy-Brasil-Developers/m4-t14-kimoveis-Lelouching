import { getAllRealEstatesService } from "./../services/realEstate/getAllRealEstates.service"
import { Address } from "./../entities/adresses.entities"
import { Request, Response } from "express";
import { iRealEstateCreate } from "../interfaces/realEstate.interfaces";
import { createAddressService } from "../services/adresses/createAddress.service";
import { Category, RealEstate } from "../entities";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";

export const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstateBody: iRealEstateCreate = req.body
    const { size, value } = realEstateBody
    const category: Category = req.category
    
    const address: Address = await createAddressService(realEstateBody.address)
    const realEstate: any = await createRealEstateService({ size, value }, address, category)

    return res.status(201).json(realEstate)
}

export const getAllRealEstateControllers = async (req: Request, res: Response): Promise<Response> => {
    const realEstates: RealEstate[] = await getAllRealEstatesService()

    return res.status(200).json(realEstates)
}
import { getAllRealEstatesByCategoryService } from "../services/categories/getAllRealEstatesByCategory.service"
import { Request, Response } from "express";
import { Category, RealEstate } from "../entities";
import { createCategoryService } from "../services/categories/createCategory.service";
import { getAllCategoriesService } from "../services/categories/getAllCategories.service";
import { iCategoryRealEstates } from "../interfaces/categories.interfaces";

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const category: Category = await createCategoryService(req.body.name)

    return res.status(201).json(category)
}

export const getAllRealEstatesByCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const realEstates: iCategoryRealEstates = await getAllRealEstatesByCategoryService(req.category)

    return res.status(200).json(realEstates)
}

export const getAllCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const categories: Category[] = await getAllCategoriesService()

    return res.status(200).json(categories)
}
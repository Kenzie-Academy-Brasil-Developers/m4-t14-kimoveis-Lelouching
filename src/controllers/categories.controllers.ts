import { getAllCategoriesService } from "./../services/categories/getAllCategories.service"
import { Request, Response } from "express";
import { Category } from "../entities";
import { createCategoryService } from "../services/categories/createCategory.service";

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const category: Category = await createCategoryService(req.body.name)

    return res.status(201).json(category)
}

export const getAllCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const categories: Category[] = await getAllCategoriesService()

    return res.status(200).json(categories)
}
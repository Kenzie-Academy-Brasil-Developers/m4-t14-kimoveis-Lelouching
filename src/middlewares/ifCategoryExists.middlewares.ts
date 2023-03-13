import { NextFunction, Request, Response } from "express"
import { Category } from "../entities"
import { getCategoryByNameService } from "../services/categories/getCategoryByName.service"

export const ifCategoryExists = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const category: Category | null = await getCategoryByNameService(req.body.name)

    if(category){
        return res.status(409).json({
            message: "Category already exists"
        })
    }

    return next()
}
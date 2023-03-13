import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import { getCategoryByIdService } from "../services/categories/getCategoryById.service";

export const ifCategoryIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    let id: number = req.body.categoryId

    if(req.method === "GET"){
        id = Number(req.params.id)
    }

    const category: Category | null = await getCategoryByIdService(id)
    
    if(!category){
        return res.status(404).json({
            message: "Category not found"
        })
    }

    req.category = category

    return next()
}
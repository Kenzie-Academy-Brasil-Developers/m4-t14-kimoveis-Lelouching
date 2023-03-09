import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

export const validateBody = (schema: ZodTypeAny) => async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const validatedBody: any = await schema.parse(req.body)

    req.body = validatedBody

    return next()
}
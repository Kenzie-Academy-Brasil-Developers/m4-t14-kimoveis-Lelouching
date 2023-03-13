import { userCreateSchema, userInfoSchema } from "./../schemas/users.schemas"
import { z } from "zod";

export type iUserInfo = z.infer<typeof userInfoSchema>
export type iUserCreate = z.infer<typeof userCreateSchema>

export interface iUser{
    id: number,
    admin: boolean,
    email: string,
    deletedAt: string | Date
}
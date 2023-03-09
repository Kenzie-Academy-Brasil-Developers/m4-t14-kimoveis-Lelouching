import { userCreateSchema, userInfoSchema } from "./../schemas/users.schemas"
import { z } from "zod";

export type iUserInfo = z.infer<typeof userInfoSchema>
export type iUserCreate = z.infer<typeof userCreateSchema>
import { z } from "zod";
import { userLoginSchema } from "../schemas/login.schemas";

export type iUserLogin = z.infer<typeof userLoginSchema>
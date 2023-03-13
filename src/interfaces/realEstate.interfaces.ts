import { realEstateInfoSchema } from "./../schemas/realEstate.schemas"
import { z } from "zod";
import { realEstateCreateSchema } from "../schemas/realEstate.schemas";

export type iRealEstateCreate = z.infer<typeof realEstateCreateSchema>

export type iRealEstateInfo = z.infer<typeof realEstateInfoSchema>
import { z } from "zod";
import { addressCreateSchema } from "../schemas/address.schemas";

export type iAddressCreate = z.infer<typeof addressCreateSchema>
import { z } from "zod";
import { RealEstate } from "../entities";

export interface iCategoryRealEstates{
    id: number,
    name: string,
    realEstate: RealEstate[]
}
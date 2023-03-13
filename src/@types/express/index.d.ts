import { Category } from "../../entities"
import { iUser } from "../../interfaces/users.interfaces"

declare global{
    namespace Express{
        interface Request{
            userToken: iUser,
            userId: iUser,
            category: Category
        }
    }
}
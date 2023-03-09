import { iUserInfo } from "./../../interfaces/users.interfaces"

declare global{
    namespace Express{
        interface Request{
            userToken: iUserInfo,
            userId: iUserInfo
        }
    }
}
import { loginUserService } from "./../services/login/loginUser.service"
import { Request, Response } from "express";
import { iUserLogin } from "../interfaces/login.interfaces";

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const user: iUserLogin = req.body

    const token: string = await loginUserService(user)

    return res.status(200).json({ token })
}
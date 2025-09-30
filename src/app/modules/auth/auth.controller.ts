import { Request, Response } from "express";
import { authService } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";

const login=async(req:Request,res:Response)=>{
    try {
          const login=await authService.login(req.body)
          setAuthCookie(res,login)
           res.status(201).json(login);
        } catch (error:any) {
           res.status(400).json(error.message);
        }
}


export const authController={
    login
}
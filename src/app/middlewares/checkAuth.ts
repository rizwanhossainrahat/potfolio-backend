import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/db";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth=(...authRoles:string[])=>async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const accessToken=req.headers.authorization || req.cookies.accessToken;
         if(!accessToken){
            throw new Error("Token not recieved")
        }
        const verifiedToken=verifyToken(accessToken,process.env.JWT_ACCESS_SECRET as string ) as JwtPayload
        const isUserExits=await prisma.user.findUnique({
            where:{email:verifiedToken.email}
        })
          if(!isUserExits){
            throw new Error("User not Found")
        }

         if (!authRoles.includes(verifiedToken.role)) {
            throw new Error("You are not permitted to view this route!!!")
        }

        req.user=verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)

    }
}
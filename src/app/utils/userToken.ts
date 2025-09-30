import {  User } from "@prisma/client";
import { generateToken, verifyToken } from "./jwt";
import { prisma } from "../config/db";
import { JwtPayload } from "jsonwebtoken";


export const createUserToken=(user:User)=>{
    const jwtPayload={
        userId:user.id,
        email:user.email,
        role:user.Role
    }
   
    const accessToken=generateToken(jwtPayload,process.env.JWT_ACCESS_SECRET as string,process.env.JWT_ACCESS_EXPIRES as string)
    const refreshToken=generateToken(jwtPayload,process.env.JWT_REFRESH_SECRET as string,process.env.JWT_REFRESH_EXPIRES as string)
    
    return{
        accessToken:accessToken,
        refreshToken:refreshToken
    }
}

export const createNewAccessTokenWithRefreshToken=async(refreshToken:string)=>{
   const verfiedRefreshToken=verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET ||"access_secret") as JwtPayload
    const isUserExist=await prisma.user.findUnique({
        where:{email:verfiedRefreshToken.email }
    })
   
    if(!isUserExist){
        throw new Error(`User does not exists`)
    }
   

     const jwtPayload={
        userId:isUserExist?.id,
        email:isUserExist?.email,
        role:isUserExist?.Role
    }

    const accessToken=generateToken(jwtPayload,process.env.JWT_ACCESS_SECRET as string,process.env.JWT_ACCESS_EXPIRES as string)
   

    // const userToken=createUserToken(isUserExist)
    return accessToken

}
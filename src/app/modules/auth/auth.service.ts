import { prisma } from "../../config/db"
import bcryptjs from "bcryptjs"
import { createUserToken } from "../../utils/userToken"

interface ILogin{
    email:string
    password:string
}


const login=async(payload:ILogin)=>{
    const {email,password}=payload
    const isUserExists=await prisma.user.findUnique({
        where:{email}
    })
    if(!isUserExists){
        throw new Error("User does not exists")
    }

    const isPasswordMatch=await bcryptjs.compare(password as string ,isUserExists.password as string)
    if(!isPasswordMatch){
         throw new Error("password does not match")
    }

    const userToken=createUserToken(isUserExists)
    const{password:pass,...rest}=isUserExists

    return{
        accessToken:userToken.accessToken,
        refreshToken:userToken.refreshToken,
        data:rest
    }
}

export const authService={
    login
}
import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db";
import bcryptjs from "bcryptjs"
import { JwtPayload } from "jsonwebtoken";



const createUser=async(payload:Prisma.UserCreateInput):Promise<User>=>{
     const {email,password,...rest}=payload
   
    const isUserExists=await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(isUserExists){
        throw new Error("User already exists ");
    }

    const hashPassword=await bcryptjs.hash(password as string,10 )
    const result = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      ...rest, 
    },
  });
    return result
   
}

const getSingleUser=async(id:number,decodedUser:JwtPayload)=>{
    if(decodedUser.userId!==id){
        throw new Error("You are not permitted to visit this route")
    }
    const user=await prisma.user.findUnique({
        where:{
            id:id
        }
    })
    if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
    return user
}

const getAllUser=async()=>{
    const users=await prisma.user.findMany()
    return users
}


export const userService={
    createUser,
    getSingleUser,
    getAllUser
}
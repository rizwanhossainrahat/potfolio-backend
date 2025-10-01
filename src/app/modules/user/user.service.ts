import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db";
import bcryptjs from "bcryptjs"
import { decode, JwtPayload } from "jsonwebtoken";

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

const getSingleUser=async(decodedUser:JwtPayload)=>{
   
    const user=await prisma.user.findUnique({
        where:{
            id:decodedUser.id
        },
      select:{
   id:true,
   name: true,
  email: true,
  Role: true,
  bio: true,
  avatarUrl: true,
  location: true,
  github: true,
  linkedin: true,
  facebook: true,
  twitter: true,
  createdAt: true,
  updatedAt: true
        },
        
    })
    if (!user) {
    throw new Error(`User with id  not found`);
  }
    return user
}

const getAllUser=async()=>{
    const users=await prisma.user.findMany({
        select:{
            id:true,
          name: true,
  email: true,
  Role: true,
  bio: true,
  avatarUrl: true,
  location: true,
  github: true,
  linkedin: true,
  facebook: true,
  twitter: true,
  createdAt: true,
  updatedAt: true
        }
    })
    return users
}

const updateUser=async(payload:Partial<User>,decodedUser:JwtPayload)=>{
    const isUserExist=await prisma.user.findUnique({where:{id:decodedUser.id}})
    const updatedUser=await prisma.user.update({
        where:{id:decodedUser.id},
        data:payload,
         select:{
    id:true,
 name: true,
  email: true,
  Role: true,
  bio: true,
  avatarUrl: true,
  location: true,
  github: true,
  linkedin: true,
  facebook: true,
  twitter: true,
  createdAt: true,
  updatedAt: true
        }
    })
    return updatedUser
}

const deleteUser=async(decodedUser:JwtPayload)=>{
    const deletedUser=await prisma.user.delete({
        where:{id:decodedUser.id},
    })
    return deletedUser
}

export const userService={
    createUser,
    getSingleUser,
    getAllUser,
    updateUser,
    deleteUser
}
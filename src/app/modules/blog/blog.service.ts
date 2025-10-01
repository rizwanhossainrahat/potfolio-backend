import { Blog, Prisma } from "@prisma/client"
import { JwtPayload } from "jsonwebtoken"
import { prisma } from "../../config/db"

const createBlog=async(payload:Prisma.BlogCreateInput,decodedUser:JwtPayload)=>{
      const createBlog=await prisma.blog.create({
        data:{
            userId:decodedUser.id,
            ...payload
        },
        include:{
            user:{
                select:{
                    id:true,
                    email:true,
                    Role:true
                }
            }
        }
      })

      return createBlog
}

const getAllblogs=async(decodedUser:JwtPayload)=>{
      const getAllBlog=await prisma.blog.findMany({
        where:{userId:decodedUser.id}
      })

      return getAllBlog
}
const getSingleblog=async(id:number)=>{
      const getSingleBlog=await prisma.blog.findMany({
        where:{id}
      })

      return getSingleBlog
}

const updateSingleBlog=async(id:number,payload:Partial<Blog>)=>{
      const updatedBlog=await prisma.blog.update({
        where:{id},
        data:payload
      })

      return updatedBlog
}
const deleteSingleBlog=async(id:number)=>{
      const deletedBlog=await prisma.blog.delete({
        where:{id}
      })

      return deletedBlog
}

export const blogService={
    createBlog,
    getAllblogs,
    getSingleblog,
    updateSingleBlog,
    deleteSingleBlog
}
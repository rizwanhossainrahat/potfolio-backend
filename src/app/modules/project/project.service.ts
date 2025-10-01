import { Prisma, Project } from "@prisma/client"
import { JwtPayload } from "jsonwebtoken"
import { prisma } from "../../config/db"


const createProject=async(payload:Prisma.ProjectCreateInput,decodedUser:JwtPayload)=>{
        const createProjcet=await prisma.project.create({
            data:{
                userId:decodedUser.id,
                ...payload,
            },
            include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
        })
        return createProjcet
}

const getAllProject=async()=>{
        const allPorject=await prisma.project.findMany({
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
        return allPorject
}

const getSingleProject=async(id:number)=>{
    const singleProject=await prisma.project.findUnique({
        where:{id},
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
    return singleProject
}

const getAllProjectByUser=async(decodedUser:JwtPayload)=>{
    console.log(decodedUser.id)
    const getAllProjectByUser=await prisma.project.findMany({
        where: {userId: Number(decodedUser.id)},
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
    return getAllProjectByUser
}

const updateProject=async(id:number,payload:Partial<Project>)=>{
    const updatedPoject=await prisma.project.update({
        where:{id},
        data:payload
    })
    return updatedPoject
}

const deleteProject=async(id:number)=>{
    const deletedProject=await prisma.project.delete({
        where:{id}
    })

    return deletedProject
}

export const projectService={
    createProject,
    getAllProject,
    getSingleProject,
    updateProject,
    getAllProjectByUser,
    deleteProject
}
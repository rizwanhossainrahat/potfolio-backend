import { Request, Response } from "express";
import { projectService } from "./project.service";


const createProject=async(req:Request,res:Response)=>{
 try {
    const verifiedUser=req.user
      const createProject=await projectService.createProject(req.body,verifiedUser)
       res.status(201).json(createProject);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}

const getAllProject=async(req:Request,res:Response)=>{
 try {
    
      const allProject=await projectService.getAllProject()
       res.status(201).json(allProject);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}

const getSingleProject=async(req:Request,res:Response)=>{
 try {
    const id=Number(req.params.id)
      const getSingleProject=await projectService.getSingleProject(id)
       res.status(201).json(getSingleProject);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}

const getAllProjectByUser=async(req:Request,res:Response)=>{
 try {
    const verifiedUser=req.user
    console.log(verifiedUser)
      const getAllProjectByUser=await projectService.getAllProjectByUser(verifiedUser)
       res.status(201).json(getAllProjectByUser);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}

const updateProject=async(req:Request,res:Response)=>{
 try {
    const id=Number(req.params.id)
      const updatedProject=await projectService.updateProject(id,req.body)
       res.status(201).json(updatedProject);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}

const deleteProject=async(req:Request,res:Response)=>{
 try {
    const id=Number(req.params.id)
      const deletedProject=await projectService.deleteProject(id)
       res.status(201).json(deletedProject);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}

export const projectController={
    createProject,
    getAllProject,
    getSingleProject,
    updateProject,
    getAllProjectByUser,
    deleteProject
}
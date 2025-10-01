import { Request, Response } from "express"
import { blogService } from "./blog.service";

const creatBlog=async(req:Request,res:Response)=>{
    try {
        const verifiedUser=req.user
          const createBlog=await blogService.createBlog(req.body,verifiedUser)
           res.status(201).json(createBlog);
        } catch (error:any) {
           res.status(400).json(error.message);
        }
}

const getAllblogs=async(req:Request,res:Response)=>{
    try {
        const verifiedUser=req.user
          const getAllBlog=await blogService.getAllblogs(verifiedUser)
           res.status(201).json(getAllBlog);
        } catch (error:any) {
           res.status(400).json(error.message);
        }
}
const getSingleblog=async(req:Request,res:Response)=>{
    try {
           const id=Number(req.params.id)
          const getSingleBlog=await blogService.getSingleblog(id)
           res.status(201).json(getSingleBlog);
        } catch (error:any) {
           res.status(400).json(error.message);
        }
}

const updateSingleBlog=async(req:Request,res:Response)=>{
    try {
           const id=Number(req.params.id)
          const updatedBlog=await blogService.updateSingleBlog(id,req.body)
           res.status(201).json(updatedBlog);
        } catch (error:any) {
           res.status(400).json(error.message);
        }
}

const deleteSingleBlog=async(req:Request,res:Response)=>{
    try {
           const id=Number(req.params.id)
          const updatedBlog=await blogService.deleteSingleBlog(id)
           res.status(201).json(updatedBlog);
        } catch (error:any) {
           res.status(400).json(error.message);
        }
}

export const blogController={
    creatBlog,
    getAllblogs,
    getSingleblog,
    updateSingleBlog,
    deleteSingleBlog
}
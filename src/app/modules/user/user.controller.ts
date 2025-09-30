import { Request, Response } from "express";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";



const createUser=async(req:Request,res:Response)=>{
 try {
      const createUser=await userService.createUser(req.body)
       res.status(201).json(createUser);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}

const getSingleUser=async(req:Request,res:Response)=>{
 try {  
   const verifiedToken=req.user
    const id = Number(req.params.id); 
        const user=await userService.getSingleUser(id,verifiedToken as JwtPayload) 
       res.status(201).json(user);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}
const getAllUser=async(req:Request,res:Response)=>{
 try {  
        const user=await userService.getAllUser() 
       res.status(201).json(user);
    } catch (error:any) {
       res.status(400).json(error.message);
    }
}



export const userController={
    createUser,
    getSingleUser,
    getAllUser
}
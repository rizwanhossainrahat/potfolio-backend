import express  from "express"
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";


const router=express.Router()

router.post("/create-user",userController.createUser)
router.get("/me/:id",checkAuth(...Object.values(Role)),userController.getSingleUser)
router.get("/users",userController.getAllUser)

export const userRoutes=router;
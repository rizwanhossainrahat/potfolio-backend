import express  from "express"
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";


const router=express.Router()

router.post("/create-user",userController.createUser)
router.get("/me",checkAuth(...Object.values(Role)),userController.getSingleUser)
router.get("/users",userController.getAllUser)
router.patch("/update",checkAuth(...Object.values(Role)),userController.updateUser)
router.delete("/delete",checkAuth(...Object.values(Role)),userController.deleteUser)

export const userRoutes=router;
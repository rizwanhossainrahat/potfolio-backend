import express  from "express"
import { projectController } from "./project.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { Role } from "@prisma/client"

const router=express.Router()

router.post("/create-project",checkAuth(...Object.values(Role)),projectController.createProject)
router.get("/project",projectController.getAllProject)
router.get("/project/:id",projectController.getSingleProject)
router.get("/projects-user",checkAuth(...Object.values(Role)),projectController.getAllProjectByUser)
router.patch("/project/:id",projectController.updateProject)
router.delete("/project/:id",projectController.deleteProject)

export const projectRouter=router;
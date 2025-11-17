import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller.js";

const userRouter = Router()

// ------------------------ EJERCICIOS ------------------------

// Read
userRouter.get('/exercises',verifyJWT,verifyRoles(""),exerciseController.findExercise)
userRouter.get('/exercises/:id',verifyJWT,verifyRoles("SUPER"),exerciseController.findExercise)

export { userRouter }
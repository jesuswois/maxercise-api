import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller.js";

const userRouter = Router()

// ------------------------ EJERCICIOS ------------------------

// Read
userRouter.get('/exercises',exerciseController.findExercise)
userRouter.get('/exercises/:id',exerciseController.findExercise)

export { userRouter }
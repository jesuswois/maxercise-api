import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller.js";

const userRouter = Router()

// Create
userRouter.post('/exercises',exerciseController.createExercise)

// Read
userRouter.get('/exercises',exerciseController.findExercise)
userRouter.get('/exercises/:id',exerciseController.findExercise)

// Update
userRouter.put('/exercises/:id',exerciseController.updateExercise)
userRouter.put('/exercises',exerciseController.updateExercise)

// Delete
userRouter.delete('/exercises/:id',exerciseController.deleteExercise)
userRouter.delete('/exercises',exerciseController.deleteExercise)

export { userRouter }
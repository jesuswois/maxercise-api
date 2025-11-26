import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";

const userRouter = Router()

// ------------------------ EJERCICIOS ------------------------

// Read
userRouter.get('/exercises',verifyJWT,verifyRoles("NORMAL"),exerciseController.findExercises)
userRouter.get('/exercises/:id',verifyJWT,verifyRoles("NORMAL"),exerciseController.findExercise)

export { userRouter }
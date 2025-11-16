import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
const adminRouter = Router()

// ------------------------ EJERCICIOS ------------------------

// Create
adminRouter.post('/exercises',verifyJWT,verifyRoles("SUPER"),verifyRolesexerciseController.createExercise)

// Update
adminRouter.put('/exercises/:id',verifyJWT,verifyRoles("SUPER"),exerciseController.updateExercise)
adminRouter.put('/exercises',verifyJWT,verifyRoles("SUPER"),exerciseController.updateExercise)

// Delete
adminRouter.delete('/exercises/:id',verifyJWT,verifyRoles("SUPER"),exerciseController.deleteExercise)
adminRouter.delete('/exercises',verifyJWT,verifyRoles("SUPER"),exerciseController.deleteExercise)

export { adminRouter }
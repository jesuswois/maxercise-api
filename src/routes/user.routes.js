import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { validateNewUser, validateUpdatedUser, verifyLoginData, verifyNewUserData } from "../middlewares/userValidator.js";
import { userController } from "../controllers/user.controller.js";

const userRouter = Router()

// ------------------------ USUARIOS ------------------------

// Read
userRouter.get('/profile/:id',verifyJWT,userController.findUser)

// Login
userRouter.post('/login',verifyLoginData,userController.login)

// Register
userRouter.post('/register',verifyNewUserData,validateNewUser,userController.register)

// Update
userRouter.put('/:id',verifyJWT,verifyJWT,verifyRoles("NORMAL"),validateUpdatedUser,userController.updateUser)

// ------------------------ EJERCICIOS ------------------------

// Read
userRouter.get('/exercises',verifyJWT,verifyRoles("NORMAL"),exerciseController.findExercises)
userRouter.get('/exercises/:id',verifyJWT,verifyRoles("NORMAL"),exerciseController.findExercise)

export { userRouter }
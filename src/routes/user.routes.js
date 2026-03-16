import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { validateNewUser, validateUpdatedUser, verifyLoginData, verifyNewUserData } from "../middlewares/userValidator.js";
import { userController } from "../controllers/user.controller.js";
import { routineController } from "../controllers/routine.controller.js";
import { userRestrictionsController } from '../controllers/userRestrictions.controller.js'

const userRouter = Router()

// ------------------------ USUARIOS ------------------------
userRouter.get('/profile/:id',verifyJWT,userController.findUser)
userRouter.post('/login',verifyLoginData,userController.login)
userRouter.post('/register',verifyNewUserData,validateNewUser,userController.register)
userRouter.put('/:id',verifyJWT,verifyJWT,verifyRoles("NORMAL"),validateUpdatedUser,userController.updateUser)

// ------------------------ RESTRICCIONES DE USUARIO ------------------------
userRouter.get('/restrictions/:user_id',userRestrictionsController.findUserRestrictions)
userRouter.post('/restrictions',userRestrictionsController.createUserRestriction)
userRouter.put('/restrictions/:user_id',userRestrictionsController.updateUserRestriction)
userRouter.delete('/restrictions/:user_id',userRestrictionsController.deleteUserRestriction)
// ------------------------  ------------------------

// ------------------------ EJERCICIOS ------------------------

// Read
userRouter.get('/exercises',verifyJWT,verifyRoles("NORMAL"),exerciseController.findExercises)
userRouter.get('/exercises/:id',verifyJWT,verifyRoles("NORMAL"),exerciseController.findExercise)

// ------------------------ RUTINAS     ------------------------

// Read
userRouter.get('/routine/:routine_id',verifyJWT,verifyRoles("NORMAL"),routineController.findRoutine)
userRouter.get('/routines',verifyJWT,verifyRoles("NORMAL"),routineController.findRoutines)
userRouter.get('/routine/:routine_id/exercise/:routine_exercise_id',verifyJWT,verifyRoles("NORMAL"),routineController.findRoutineExercises)

export { userRouter }
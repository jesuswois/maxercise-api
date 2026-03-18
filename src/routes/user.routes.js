import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller.js";
import verifyJWT from "../middlewares/auth/verifyJWT.js";
import verifyRoles from "../middlewares/auth/verifyRoles.js";
import { validateNewUser, validateUpdatedUser, verifyLoginData, verifyNewUserData } from "../middlewares/userValidator.js";
import { userController } from "../controllers/user.controller.js";
import { routineController } from "../controllers/routine.controller.js";
import { userRestrictionsController } from '../controllers/userRestrictions.controller.js'
import { verifyUserRestrictionData, validateNewUserRestriction, validateUpdatedUserRestriction } from "../middlewares/userRestrictionValidator.js";
import { muscleController } from "../controllers/muscle.controller.js";

const userRouter = Router()

// ------------------------ USUARIOS ------------------------
userRouter.get('/profile/:id',verifyJWT,userController.findUser)
userRouter.post('/login',verifyLoginData,userController.login)
userRouter.post('/register',verifyNewUserData,validateNewUser,userController.register)
userRouter.put('/:id',verifyJWT,verifyJWT,verifyRoles("NORMAL"),validateUpdatedUser,userController.updateUser)

// ------------------------ RESTRICCIONES DE USUARIO ------------------------
userRouter.get('/restrictions/:user_id', verifyJWT, verifyRoles("NORMAL"), userRestrictionsController.findUserRestrictions)
userRouter.post('/restrictions', verifyJWT, verifyRoles("NORMAL"), verifyUserRestrictionData, validateNewUserRestriction, userRestrictionsController.createUserRestriction)
userRouter.put('/restrictions/:user_id', verifyJWT,verifyRoles("NORMAL"), validateUpdatedUserRestriction,userRestrictionsController.updateUserRestriction)

// ------------------------ MUSCULOS ------------------------
userRouter.get('/muscles',verifyJWT, verifyRoles("NORMAL"), muscleController.findMuscles)
userRouter.get('/muscles/:id',verifyJWT, verifyRoles("NORMAL", muscleController.findMuscle))

// ------------------------ EJERCICIOS ------------------------
userRouter.get('/exercises',verifyJWT,verifyRoles("NORMAL"),exerciseController.findExercises)
userRouter.get('/exercises/:id',verifyJWT,verifyRoles("NORMAL"),exerciseController.findExercise)

// ------------------------ RUTINAS     ------------------------
userRouter.get('/routine/:routine_id',verifyJWT,verifyRoles("NORMAL"),routineController.findRoutine)
userRouter.get('/routines',verifyJWT,verifyRoles("NORMAL"),routineController.findRoutines)
userRouter.get('/routine/:routine_id/exercise/:routine_exercise_id',verifyJWT,verifyRoles("NORMAL"),routineController.findRoutineExercises)

export { userRouter }
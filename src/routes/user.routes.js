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
userRouter.get('/profile',verifyJWT,verifyRoles({OR:["NORMAL","SUSCRIPTION"]}),userController.findUser)
userRouter.post('/login',verifyLoginData,userController.login)
userRouter.post('/register',verifyNewUserData,validateNewUser,userController.register)
userRouter.put('/:id',verifyJWT,verifyRoles({OR:["NORMAL","SUSCRIPTION"]}),validateUpdatedUser,userController.updateUser)

// ------------------------ RESTRICCIONES DE USUARIO ------------------------
userRouter.get('/restrictions', verifyJWT, verifyRoles({OR:["NORMAL","SUSCRIPTION"]}), userRestrictionsController.findUserRestrictions)
userRouter.post('/restrictions', verifyJWT, verifyRoles({OR:["NORMAL","SUSCRIPTION"]}), verifyUserRestrictionData, validateNewUserRestriction, userRestrictionsController.createUserRestriction)
userRouter.put('/restrictions', verifyJWT,verifyRoles({OR:["NORMAL","SUSCRIPTION"]}), validateUpdatedUserRestriction,userRestrictionsController.updateUserRestriction)

// ------------------------ MUSCULOS ------------------------
userRouter.get('/muscles',verifyJWT, verifyRoles({OR:["NORMAL","SUSCRIPTION"]}), muscleController.findMuscles)
userRouter.get('/muscles/:id',verifyJWT, verifyRoles({OR:["NORMAL","SUSCRIPTION"]}), muscleController.findMuscle)

// ------------------------ EJERCICIOS ------------------------
userRouter.get('/exercises',verifyJWT,verifyRoles({OR:["NORMAL","SUSCRIPTION"]}),exerciseController.findExercises)
userRouter.get('/exercises/:id',verifyJWT,verifyRoles({OR:["NORMAL","SUSCRIPTION"]}),exerciseController.findExercise)

// ------------------------ RUTINAS     ------------------------
userRouter.get('/routine/:routine_id',verifyJWT,verifyRoles({OR:["NORMAL","SUSCRIPTION"]}),routineController.findRoutine)
userRouter.get('/routines',verifyJWT,verifyRoles({OR:["NORMAL","SUSCRIPTION"]}),routineController.findRoutines)

export { userRouter }
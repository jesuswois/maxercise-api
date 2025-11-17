import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { exerciseController } from "../controllers/exercise.controller.js";
import jwtHelper from "../utils/jwtHelper.js";
const adminRouter = Router()

// ------------------------ EJERCICIOS ------------------------

// Create
adminRouter.post('/exercises',verifyJWT,verifyRoles("SUPER"),exerciseController.createExercise)

// Update
adminRouter.put('/exercises/:id',verifyJWT,verifyRoles("SUPER"),exerciseController.updateExercise)
adminRouter.put('/exercises',verifyJWT,verifyRoles("SUPER"),exerciseController.updateExercise)

// Delete
adminRouter.delete('/exercises/:id',verifyJWT,verifyRoles("SUPER"),exerciseController.deleteExercise)
adminRouter.delete('/exercises',verifyJWT,verifyRoles("SUPER"),exerciseController.deleteExercise)

// ------------------------  TESTING   ------------------------

// JWT
adminRouter.post('/generate',(req,res)=>{
    const data = req.body
    console.log(!!data.role)
    if(!data.id || !data.role) return res.status(400).json({message:"Id o Role no proporcionado"})
    const token = jwtHelper.sign(data)
    return res.status(200).json({message:"Token creado exitosamente!",data:{token}})
})
// Roles
adminRouter.get('/protected',verifyJWT,verifyRoles("SUPER"),(req,res)=>{
    console.log("User ID: "+req.id)
    console.log("User Role: "+req.role)
    return res.status(200).json({message:"Successful!"})
})


export { adminRouter }
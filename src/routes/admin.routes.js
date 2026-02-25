import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { exerciseController } from "../controllers/exercise.controller.js";
import jwtHelper from "../utils/libraries/jwtHelper.js";
import { validateNewExercise, validateUpdatedExercise } from "../middlewares/exerciseValidator.js";
import { prisma } from "../config/prisma.js";
const adminRouter = Router()

// ------------------------ EJERCICIOS ------------------------

// Create
adminRouter.post('/exercises',verifyJWT,verifyRoles("SUPER"),validateNewExercise,exerciseController.createExercise)

// Update
adminRouter.put('/exercises/:id',verifyJWT,verifyRoles("SUPER"),validateUpdatedExercise,exerciseController.updateExercise)
// adminRouter.put('/exercises',verifyJWT,verifyRoles("SUPER"),exerciseController.updateExercise)

// Delete
adminRouter.delete('/exercises/:id',verifyJWT,verifyRoles("SUPER"),exerciseController.deleteExercise)
adminRouter.delete('/exercises',verifyJWT,verifyRoles("SUPER"),exerciseController.deleteExercise)

// ------------------------  TESTING   ------------------------

// Cuenta
adminRouter.post('/testing_account',async (req,res)=>{
    await prisma.user.delete({where:{email:"testing@test.com"}})
    const result = await prisma.user.create({
        data:{
            first_name:"Testing",
            last_name:"Program",
            phone_number:"776 630 2392",
            email:"testing@test.com",
            password:"testing12",
            role:"SUPER"
        }
    })
    const data = {id:result.id,role:result.role}
    const token = jwtHelper.sign(data)
    res.status(200).json({message:"Token creado exitosamente!",data:{token}})
})
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
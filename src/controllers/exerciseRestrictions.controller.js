import { exerciseRestrictionsService } from "../services/exerciseRestrictions.service.js";

const exerciseRestrictionsController = {
    createExerciseRestriction: async (req, res) => {
        try {
            const result = await exerciseRestrictionsService.create(req.data)
            return res.status(200).json({message:"Restricción de ejercicio creada",data:result})
        } catch (error) {
            console.log("Ha ocurrido un error! " + error.message)
            return res.status(400).json({message:"Ha ocurrido un error!",data:{error}})
        }
    },
    updateExerciseRestriction: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const { exerciseRestriction }  = req.data
            const result = await exerciseRestrictionsService.updateOne(id,exerciseRestriction)
            return res.status(200).json({message:"Restricción de ejercicio actualizada",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteExerciseRestriction: async (req,res) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await exerciseRestrictionsService.deleteOne(id)
            return res.status(200).json({message:"Restricción de ejercicio eliminada",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findExerciseRestriction: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const result = await exerciseRestrictionsService.findOne(id)
            return res.status(200).json({message:"Restricción de ejercicio retornada correctamente!",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findExerciseRestrictions: async (req,res) => {
        try{
            let filters = null
            if(req.data.filters){
                // Procesar filtros
            }
            const result = await exerciseRestrictionsService.findMany(filters)
            return res.status(200).json({message:"Restricciones de ejercicio retornadas correctamente!",data:result})
        } catch(error) {
            return res.status(400).json({message: "Ha ocurrido un error!", data: { error }})
        }
    }
}

export { exerciseRestrictionsController }
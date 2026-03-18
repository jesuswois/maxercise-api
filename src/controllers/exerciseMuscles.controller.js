import { exerciseMusclesService } from "../services/exercisemuscles.service.js"

const exerciseMusclesController = {
    createExerciseMuscle: async (req, res, next) => {
        try {
            const result = await exerciseMusclesService.create(req.data)
            return res.status(200).json({message:"Músculo de ejercicio creado",data:result})
        } catch (error) {
            next(error)
        }
    },
    updateExerciseMuscle: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const { routine }  = req.data
            const result = await exerciseMusclesService.updateOne(id,routine)
            return res.status(200).json({message:"Músculo de ejercicio actualizado",data:result})
        } catch (error) {
            next(error)
        }
    },
    deleteExerciseMuscle: async (req,res,next) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await exerciseMusclesService.deleteOne(id)
            return res.status(200).json({message:"Músculo de ejercicio eliminado",data:result})
        } catch (error) {
            next(error)
        }
    },
    findExerciseMuscle: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const result = await exerciseMusclesService.findOne(id)
            return res.status(200).json({message:"Músculo de ejercicio retornado correctamente!",data:result})
        } catch (error) {
            next(error)
        }
    },
    findExerciseMuscles: async (req,res,next) => {
        try{
            let filters = null
            if(req.data.filters){
                // Procesar filtros
            }
            const result = await exerciseMusclesService.findMany(filters)
            return res.status(200).json({message:"Músculos de ejercicio retornados correctamente!",data:result})
        } catch(error) {
            next(error)
        }
    }
}

export { exerciseMusclesController }
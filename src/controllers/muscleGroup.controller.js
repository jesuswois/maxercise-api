import { muscleGroupService } from "../services/muscleGroup.service.js";

const muscleGroupController = {
    createMuscleGroup: async (req, res, next) => {
        try {
            const result = await muscleGroupService.create(req.data)
            return res.status(200).json({message:"Grupo muscular creado",data:result})
        } catch (error) {
            next(error)
        }
    },
    updateMuscleGroup: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const { muscleGroup }  = req.data
            const result = await muscleGroupService.updateOne(id,muscleGroup)
            return res.status(200).json({message:"Grupo muscular actualizado",data:result})
        } catch (error) {
            next(error)
        }
    },
    deleteMuscleGroup: async (req,res,next) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await muscleGroupService.deleteOne(id)
            return res.status(200).json({message:"Grupo muscular eliminado",data:result})
        } catch (error) {
            next(error)
        }
    },
    findMuscleGroup: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const result = await muscleGroupService.findOne(id)
            return res.status(200).json({message:"Grupo muscular retornado correctamente!",data:result})
        } catch (error) {
            next(error)
        }
    },
    findMuscleGroups: async (req,res,next) => {
        try{
            let filters = null
            if(req.data.filters){
                // Procesar filtros
            }
            const result = await muscleGroupService.findMany(filters)
            return res.status(200).json({message:"Grupos musculares retornados correctamente!",data:result})
        } catch(error) {
            next(error)
        }
    }
}

export { muscleGroupController }
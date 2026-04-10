import { muscleService } from "../services/muscle.service.js";

const muscleController = {
    createMuscle: async (req, res, next) => {
        try {
            const result = await muscleService.create(req.data)
            return res.status(200).json({message:"Músculo creado",data:result})
        } catch (error) {
            next(error)
        }
    },
    updateMuscle: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const { muscle }  = req.data
            const result = await muscleService.updateOne(id,muscle)
            return res.status(200).json({message:"Músculo actualizado",data:result})
        } catch (error) {
            next(error)
        }
    },
    deleteMuscle: async (req,res,next) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await muscleService.deleteOne(id)
            return res.status(200).json({message:"Músculo eliminado",data:result})
        } catch (error) {
            next(error)
        }
    },
    findMuscle: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const result = await muscleService.findOne(id)
            return res.status(200).json({message:"Músculo retornado correctamente!",data:result})
        } catch (error) {
            next(error)
        }
    },
    findMuscles: async (req,res,next) => {
        try{
            let filters = req.data?.filters || {};
            const result = await muscleService.findMany(filters)
            return res.status(200).json({message:"Músculos retornados correctamente!",data:result})
        } catch(error) {
            next(error)
        }
    }
}

export { muscleController }
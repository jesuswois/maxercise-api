import { routineService } from "../services/routine.service.js";

const routineController = {
    createRoutine: async (req, res, next) => {
        try {
            const result = await routineService.create(req.data)
            return res.status(200).json({message:"Rutina creada",data:result})
        } catch (error) {
            next(error)
        }
    },
    updateRoutine: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const { routine }  = req.data
            const result = await routineService.updateOne(id,routine)
            return res.status(200).json({message:"Rutina actualizada",data:result})
        } catch (error) {
            next(error)
        }
    },
    deleteRoutine: async (req,res,next) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await routineService.deleteOne(id)
            return res.status(200).json({message:"Rutina eliminada",data:result})
        } catch (error) {
            next(error)
        }
    },
    findRoutine: async (req,res,next) => {
        try {
            const id = parseInt(req.params.routine_id)
            const result = await routineService.findOne(id)
            return res.status(200).json({message:"Rutina retornada correctamente!",data:result})
        } catch (error) {
            next(error)
        }
    },
    findRoutines: async (req,res,next) => {
        try{
            let filters = req.data?.filters || {};
            const result = await routineService.findMany(filters);
            return res.status(200).json({message:"Rutinas retornadas correctamente!", data:result});
        } catch(error) {
            next(error);
        }
    }
}

export { routineController }
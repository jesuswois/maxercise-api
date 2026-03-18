import { routineExerciseService } from "../services/routineExercise.service.js"

const routineExerciseController = {
    createRoutineExercise: async (req, res, next) => {
        try {
            const result = await routineExerciseService.create(req.data)
            return res.status(200).json({message:"Ejercicio de rutina creado",data:result})
        } catch (error) {
            next(error)
        }
    },
    updateRoutineExercise: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const { routine_exercise }  = req.data
            const result = await routineExerciseService.updateOne(id,routine_exercise)
            return res.status(200).json({message:"Ejercicio de rutina actualizado",data:result})
        } catch (error) {
            next(error)
        }
    },
    deleteRoutineExercise: async (req,res,next) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await routineExerciseService.deleteOne(id)
            return res.status(200).json({message:"Ejercicio de rutina eliminado",data:result})
        } catch (error) {
            next(error)
        }
    },
    findRoutineExercises: async (req,res,next) => {
        try {
            const { id } = parseInt(req.data)
            const result = await routineExerciseService.findMany(id)
            return res.status(200).json({message:"Ejercicio de rutina retornada correctamente!",data:result})
        } catch (error) {
            next(error)
        }
    },
    findRoutineExercise: async (req,res,next) => {
        try {
            const { routine_exercise_id } = parseInt(req.data)
            const result = await routineExerciseService.findOne(routine_exercise_id)
            return res.status(200).json({message:"Ejercicio de rutina retornada correctamente!",data:result})
        } catch (error) {
            next(error)
        }
    }

}

export { routineExerciseController }
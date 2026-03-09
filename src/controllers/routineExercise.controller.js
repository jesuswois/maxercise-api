import { routineExerciseService } from "../services/routineExercise.service.js"

const routineExerciseController = {
    createRoutineExercise: async (req, res) => {
        try {
            const result = await routineExerciseService.create(req.data)
            return res.status(200).json({message:"Ejercicio de rutina creado",data:result})
        } catch (error) {
            console.log("Ha ocurrido un error! " + error.message)
            return res.status(400).json({message:"Ha ocurrido un error!",data:{error}})
        }
    },
    updateRoutineExercise: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const { routine_exercise }  = req.data
            const result = await routineExerciseService.updateOne(id,routine_exercise)
            return res.status(200).json({message:"Ejercicio de rutina actualizado",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteRoutineExercise: async (req,res) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await routineExerciseService.deleteOne(id)
            return res.status(200).json({message:"Ejercicio de rutina eliminado",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findRoutineExercises: async (req,res) => {
        try {
            const { id } = parseInt(req.data)
            const result = await routineExerciseService.findMany(id)
            return res.status(200).json({message:"Ejercicio de rutina retornada correctamente!",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findRoutineExercise: async (req,res) => {
        try {
            const { routine_exercise_id } = parseInt(req.data)
            const result = await routineExerciseService.findOne(routine_exercise_id)
            return res.status(200).json({message:"Ejercicio de rutina retornada correctamente!",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    }

}

export { routineExerciseController }
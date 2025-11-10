import { exerciseService } from "../services/exercise.service.js";

const exerciseController = {
    createExercise: async (req, res) => {
        try {
            const result = await exerciseService.create(...req.body)
            return res.status(200).json({ message: "Ejercicio creado correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    createExercises: async (req, res) => {
        try {
            const result = await exerciseService.createMany(...req.body)
            return res.status(200).json({ message: "Ejercicios creados correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findExercise: async (req, res) => {
        try {
            const { id } = req.body
            const result = await exerciseService.findOne(id)
            return res.status(200).json({ message: "Ejercicio retornado correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findExercises: async (req, res) => {
        try {
            // Procesar filtros
            const { filters } = req.body
            const result = await exerciseService.findMany(filters)
            return res.status(200).json({ message: "Ejercicios retornados correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    updateExercise: async (req,res) => {
        try {
            const { id, data } = req.body
            const result = await exerciseService.updateOne(id, data)
            return res.status(200).json({ message: "Ejercicio actualizado correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    updateExercises: async (req,res) => {
        try {
            const { where, data } = req.body
            const result = await exerciseService.updateMany(where,data)
            return res.status(200).json({ message: "Ejercicios actualizados correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteExercise: async (req,res) => {
        try {
            const { id } = req.body
            const result = await exerciseService.findOne(id)
            return res.status(200).json({ message: "Ejercicio eliminado correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteExercises: async () => {
        try {
            const { where } = req.body
            const result = await exerciseService.deleteMany(where)
            return res.status(200).json({ message: "Ejercicios eliminados correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    }
}

export { exerciseController }
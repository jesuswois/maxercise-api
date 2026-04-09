import { exerciseService } from "../services/exercise.service.js";

const exerciseController = {
    createExercise: async (req, res, next) => {
        try {
            let result
            if (Array.isArray(req.body)) {
                result = await exerciseService.createMany({ ...req.data })
            } else {
                result = await exerciseService.create({ ...req.data })
            }
            return res.status(200).json({ message: (Array.isArray(req.body) ? "Ejercicios creados" : "Ejercicio creado") + "correctamente!", data: { result } })
        } catch (error) {
            next(error)
        }
    },
    findExercise: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id)
            const result = await exerciseService.findOne(id)
            if(!result) return res.status(200).json({ message: "Ejercicio no encontrado!", data: null }) 
            return res.status(200).json({ message: "Ejercicio retornado correctamente!", data: result })
        } catch (error) {
            next(error)
        }
    },
    findExercises: async (req, res, next) => {
        try {
            let filters = null
            if (req.body?.filters) {
                // Procesar filtros
                filters = req.body.filters
            }
            const result = await exerciseService.findMany(filters)
            return res.status(200).json({ message: "Ejercicios retornados correctamente!", data: { result } })
        } catch (error) {
            next(error)
        }
    },
    updateExercise: async (req, res, next) => {
        try {
            if (!req.params?.id) {
                return res.status(400).json({ message: "Verificar ID proporcionada!" })
            }
            const id = parseInt(req.params.id)
            const result = await exerciseService.updateOne(id, req.data)
            return res.status(200).json({ message: "Ejercicio actualizado correctamente!", data: { result } })
        } catch (error) {
            next(error)
        }
    },
    deleteExercise: async (req, res, next) => {
        try {
            if (!req.params.id || !req.body.ids) {
                return res.status(400).json({ message: "Verificar ID(s) proporcionada(s)!" })
            }
            const data = (req.params?.id?parseInt(req.params.id):req.body.ids)
            let result
            if (Array.isArray(data)) {
                result = await exerciseService.deleteMany({
                    id: {
                        in: data
                    }
                })
            } else {
                result = await exerciseService.deleteOne(data)
            }
            return res.status(200).json({ message: "Ejercicio(s) eliminado(s) correctamente!", data: result })
        } catch (error) {
            next(error)
        }
    }
}

export { exerciseController }
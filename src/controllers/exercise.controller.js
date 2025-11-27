import { exerciseService } from "../services/exercise.service.js";

const exerciseController = {
    createExercise: async (req, res) => {
        try {
            let result
            if (Array.isArray(req.body)) {
                result = await exerciseService.createMany({ ...req.data })
            } else {
                result = await exerciseService.create({ ...req.data })
            }
            return res.status(200).json({ message: (Array.isArray(req.body) ? "Ejercicios creados" : "Ejercicio creado") + "correctamente!", data: { result } })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findExercise: async (req, res) => {
        try {
            req.params.id = parseInt(req.params.id)
            const { id } = req.params
            const result = await exerciseService.findOne(id)
            return res.status(200).json({ message: "Ejercicio retornado correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findExercises: async (req, res) => {
        try {
            let filters
            if (req.body.filters) {
                // Procesar filtros
                const { filters } = req.body
            }
            const result = await exerciseService.findMany(filters)
            return res.status(200).json({ message: "Ejercicios retornados correctamente!", data: { result } })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    updateExercise: async (req, res) => {
        try {
            req.params.id = parseInt(req.params.id)
            if (!req.params.id || !req.params.id) {
                return res.status(400).json({ message: "Verificar ID proporcionada!" })
            }
            const result = await exerciseService.updateOne(req.params.id, req.data)
            return res.status(200).json({ message: "Ejercicio actualizado correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteExercise: async (req, res) => {
        try {
            let data
            if (req.params.id) {
                req.params.id=parseInt(req.params.id)
                // Individual
                data = req.params.id
            } else {
                // Múltiple (Array de IDs)
                data = req.body.ids
            }
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
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    }
}

export { exerciseController }
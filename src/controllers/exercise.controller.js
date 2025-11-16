import { exerciseService } from "../services/exercise.service.js";

const exerciseController = {
    createExercise: async (req, res) => {
        try {
            let result
            if(Array.isArray(req.body)){
                result = await exerciseService.createMany(...req.body)
            } else {
                result = await exerciseService.create(...req.body)
            }
            return res.status(200).json({ message: (Array.isArray(req.body)?"Ejercicios creados":"Ejercicio creado")+"correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findExercise: async (req, res) => {
        try {
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
            if(req.body.filters){
                // Procesar filtros
                const { filters } = req.body
            }
            const result = await exerciseService.findMany(filters)
            return res.status(200).json({ message: "Ejercicios retornados correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    updateExercise: async (req,res) => {
        try {
            let mode;
            const { data } = req.body
            if(req.params.id){
                // Individual
                mode = req.params.id

            } else {
                // Múltiple
                mode = req.body
            }
            const result = await exerciseService.updateOne(mode, data)
            return res.status(200).json({ message: "Ejercicio actualizado correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteExercise: async (req,res) => {
        try {
            let data 
            if(req.params.id){
                // Individual
                data = req.params.id
            }else {
                // Múltiple
                data = req.body.where
            }
            const result = await exerciseService.findOne(data)
            return res.status(200).json({ message: "Ejercicio eliminado correctamente!", data: { result } })
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    }
}

export { exerciseController }
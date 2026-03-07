import { muscleService } from "../services/muscle.service.js";

const muscleController = {
    createMuscle: async (req, res) => {
        try {
            const result = await muscleService.create(req.data)
            return res.status(200).json({message:"Músculo creado",data:result})
        } catch (error) {
            console.log("Ha ocurrido un error! " + error.message)
            return res.status(400).json({message:"Ha ocurrido un error!",data:{error}})
        }
    },
    updateMuscle: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const { muscle }  = req.data
            const result = await muscleService.updateOne(id,muscle)
            return res.status(200).json({message:"Músculo actualizado",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteMuscle: async (req,res) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await muscleService.deleteOne(id)
            return res.status(200).json({message:"Músculo eliminado",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findMuscle: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const result = await muscleService.findOne(id)
            return res.status(200).json({message:"Músculo retornado correctamente!",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findMuscles: async (req,res) => {
        try{
            let filters = null
            if(req.data.filters){
                // Procesar filtros
            }
            const result = await muscleService.findMany(filters)
            return res.status(200).json({message:"Músculos retornados correctamente!",data:result})
        } catch(error) {
            return res.status(400).json({message: "Ha ocurrido un error!", data: { error }})
        }
    }
}

export { muscleController }
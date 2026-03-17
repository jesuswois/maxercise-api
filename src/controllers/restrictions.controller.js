import { restrictionService } from "../services/restrictions.service.js";

const restrictionController = {
    createRestriction: async (req, res) => {
        try {
            const result = await restrictionService.create(req.data)
            return res.status(200).json({message:"Restricción creada",data:result})
        } catch (error) {
            console.log("Ha ocurrido un error! " + error.message)
            return res.status(400).json({message:"Ha ocurrido un error!",data:{error}})
        }
    },
    updateRestriction: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const { routine }  = req.data
            const result = await restrictionService.updateOne(id,routine)
            return res.status(200).json({message:"Restricción actualizada",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteRestriction: async (req,res) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await restrictionService.deleteOne(id)
            return res.status(200).json({message:"Restricción eliminada",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findRestriction: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const result = await restrictionService.findOne(id)
            return res.status(200).json({message:"Restricción retornada correctamente!",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findRestrictions: async (req,res) => {
        try{
            let filters = null
            if(req.data.filters){
                // Procesar filtros
            }
            const result = await restrictionService.findMany(filters)
            return res.status(200).json({message:"Restricciones retornadas correctamente!",data:result})
        } catch(error) {
            return res.status(400).json({message: "Ha ocurrido un error!", data: { error }})
        }
    }
}

export { restrictionController }
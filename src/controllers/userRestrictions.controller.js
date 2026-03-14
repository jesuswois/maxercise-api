import { userRestrictionsService } from "../services/userRestrictions.service.js"

const userRestrictionsController = {
    createUserRestriction: async (req, res) => {
        try {
            const result = await userRestrictionsService.create(req.data)
            return res.status(200).json({message:"Restricción de usuario creada",data:result})
        } catch (error) {
            console.log("Ha ocurrido un error! " + error.message)
            return res.status(400).json({message:"Ha ocurrido un error!",data:{error}})
        }
    },
    updateUserRestriction: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const { userRestriction }  = req.data
            const result = await userRestrictionsService.updateOne(id,userRestriction)
            return res.status(200).json({message:"Restricción de usuario actualizada",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    deleteUserRestriction: async (req,res) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await userRestrictionsService.deleteOne(id)
            return res.status(200).json({message:"Restricción de usuario eliminada",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findUserRestriction: async (req,res) => {
        try {
            const id = parseInt(req.data.id)
            const result = await userRestrictionsService.findOne(id)
            return res.status(200).json({message:"Restricción de usuario retornada correctamente!",data:result})
        } catch (error) {
            return res.status(400).json({ message: "Ha ocurrido un error!", data: { error } })
        }
    },
    findUserRestrictions: async (req,res) => {
        try{
            let filters = null
            if(req.data.filters){
                // Procesar filtros
            }
            const result = await userRestrictionsService.findMany(filters)
            return res.status(200).json({message:"Restricciones de usuario retornadas correctamente!",data:result})
        } catch(error) {
            return res.status(400).json({message: "Ha ocurrido un error!", data: { error }})
        }
    }
}

export { userRestrictionsController }
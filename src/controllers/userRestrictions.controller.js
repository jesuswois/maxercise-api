import { userRestrictionsService } from "../services/userRestrictions.service.js"

const userRestrictionsController = {
    createUserRestriction: async (req, res, next) => {
        try {
            const result = await userRestrictionsService.create(req.data)
            return res.status(200).json({message:"Restricción de usuario creada",data:result})
        } catch (error) {
            next(error)
        }
    },
    updateUserRestriction: async (req,res,next) => {
        try {
            let { id, ...userRestriction }  = req.data
            id = parseInt(id)
            const result = await userRestrictionsService.updateOne(id,userRestriction)
            return res.status(200).json({message:"Restricción de usuario actualizada",data:result})
        } catch (error) {
            next(error)
        }
    },
    deleteUserRestriction: async (req,res,next) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await userRestrictionsService.deleteOne(id)
            return res.status(200).json({message:"Restricción de usuario eliminada",data:result})
        } catch (error) {
            next(error)
        }
    },
    findUserRestriction: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const result = await userRestrictionsService.findOne(id)
            return res.status(200).json({message:"Restricción de usuario retornada correctamente!",data:result})
        } catch (error) {
            next(error)
        }
    },
    findUserRestrictions: async (req,res,next) => {
        try{
            const id = req.params.user_id | req.id | null
            if(!id) return res.status(400).json({message:"Debes proporcionar un ID valido"})
            // Cambia lo que tengas por esta línea a prueba de fallos:
            let filters = req.data?.filters || {};
            const result = await userRestrictionsService.findMany(id, filters)
            return res.status(200).json({message:"Restricciones de usuario retornadas correctamente!",data:result})
        } catch(error) {
            next(error)
        }
    }
}

export { userRestrictionsController }
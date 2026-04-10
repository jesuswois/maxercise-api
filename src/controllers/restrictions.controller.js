import { restrictionService } from "../services/restrictions.service.js";

const restrictionController = {
    createRestriction: async (req, res, next) => {
        try {
            const result = await restrictionService.create(req.data)
            return res.status(200).json({message:"Restricción creada",data:result})
        } catch (error) {
            next(error)
        }
    },
    updateRestriction: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const { routine }  = req.data
            const result = await restrictionService.updateOne(id,routine)
            return res.status(200).json({message:"Restricción actualizada",data:result})
        } catch (error) {
            next(error)
        }
    },
    deleteRestriction: async (req,res,next) => {
        try {
            const id  = parseInt(req.data.id)
            const result = await restrictionService.deleteOne(id)
            return res.status(200).json({message:"Restricción eliminada",data:result})
        } catch (error) {
            next(error)
        }
    },
    findRestriction: async (req,res,next) => {
        try {
            const id = parseInt(req.data.id)
            const result = await restrictionService.findOne(id)
            return res.status(200).json({message:"Restricción retornada correctamente!",data:result})
        } catch (error) {
            next(error)
        }
    },
    findRestrictions: async (req,res,next) => {
        try{
            let filters = req.data?.filters || {};
            const result = await restrictionService.findMany(filters);
            return res.status(200).json({message:"Restricciones retornadas correctamente!", data:result});
        } catch(error) {
            next(error)
        }
    }
}

export { restrictionController }
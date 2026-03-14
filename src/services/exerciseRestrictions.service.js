import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const exerciseRestrictionsService = {
    create: async (element) => {
        try {
            const result = await prisma.exerciseRestrictions.create(
                {
                    data: {
                        ...element
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo crear la restricción de ejercicio", 500)
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.exerciseRestrictions.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo obtener la restricción de ejercicio", 500)
        }
    },
    // Retorna todos los registros
    findMany: async (filters = null) => {
        try {
            const result = await prisma.exerciseRestrictions.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudieron obtener las restricciones de ejercicio", 500)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.exerciseRestrictions.update(
                {
                    where:{
                        id
                    },
                    data:{
                        ...data
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo actualizar la restricción de ejercicio", 500)
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.exerciseRestrictions.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error)
            if (error.code === "P2025") {
                throw formatError("La restricción de ejercicio que intentas eliminar no existe en la base de datos!", 404)
            }
            throw formatError("No se pudo eliminar la restricción de ejercicio", 500)
        }
    }
}

export { exerciseRestrictionsService }
import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const userRestrictionsService = {
    create: async (element) => {
        try {
            const result = await prisma.userRestrictions.create(
                {
                    data: {
                        ...element
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo crear la restricción de usuario", 500)
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.userRestrictions.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo obtener la restricción de usuario", 500)
        }
    },
    // Retorna todos los registros
    findMany: async (filters = null) => {
        try {
            const result = await prisma.userRestrictions.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudieron obtener las restricciones de usuario", 500)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.userRestrictions.update(
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
            throw formatError("No se pudo actualizar la restricción de usuario", 500)
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.userRestrictions.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error)
            if (error.code === "P2025") {
                throw formatError("La restricción de usuario que intentas eliminar no existe en la base de datos!", 404)
            }
            throw formatError("No se pudo eliminar la restricción de usuario", 500)
        }
    }
}

export { userRestrictionsService }
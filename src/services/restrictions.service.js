import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const restrictionService = {
    create: async (element) => {
        try {
            const result = prisma.restriction.create(
                {
                    data: {
                        ...element
                    }
                }
            )
            return result
        } catch (error) {
            throw formatError("No se pudo crear la restricción",500)
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.restriction.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudo obtener la restricción",500)
        }
    },
    // Retorna todos los registros
    findMany: async (filters = null) => {
        try {
            const result = await prisma.restriction.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudieron obtener las restricciones",500)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.restriction.update(
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
            throw formatError("No se pudo actualizar la restricción",500)
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.restriction.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            if (error.code === "P2025") {
                throw formatError("La restricción que intentas eliminar no existe en la base de datos!", 404)
            }
            throw formatError("No se pudo eliminar la restricción",500)
        }
    }
}

export { restrictionService }
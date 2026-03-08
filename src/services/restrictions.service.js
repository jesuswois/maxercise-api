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
            throw formatError("No se pudo crear la restricción")
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
            throw formatError("No se pudo obtener la restricción")
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
            throw formatError("No se pudieron obtener las restricciones")
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
            throw formatError("No se pudo actualizar la restricción")
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
                throw formatError("La restricción que intentas eliminar no existe en la base de datos!", "NOT_FOUND")
            }
            throw formatError("No se pudo eliminar la restricción",400)
        }
    }
}

export { restrictionService }
import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const skeletonService = {
    create: async (element) => {
        try {
            const result = prisma.skeleton.create(
                {
                    data: {
                        ...element
                    }
                }
            )
            return result
        } catch (error) {
            throw formatError("No se pudo crear el esqueleto")
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.skeleton.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudo obtener el esqueleto")
        }
    },
    // Retorna todos los registros
    findMany: async (filters = null) => {
        try {
            const result = await prisma.skeleton.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudieron obtener los esqueletos")
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.skeleton.update(
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
            throw formatError("No se pudo actualizar el esqueleto")
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.skeleton.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            if (error.code === "P2025") {
                throw formatError("El esqueleto que intentas eliminar no existe en la base de datos!", "NOT_FOUND")
            }
            throw formatError("No se pudo eliminar el esqueleto",400)
        }
    }
}

export { skeletonService }
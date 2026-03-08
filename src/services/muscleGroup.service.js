import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const muscleGroupService = {
    create: async (element) => {
        try {
            const result = prisma.muscleGroups.create(
                {
                    data: {
                        ...element
                    }
                }
            )
            return result
        } catch (error) {
            throw formatError("No se pudo crear el grupo muscular")
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.muscleGroups.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudo obtener el grupo muscular")
        }
    },
    // Retorna todos los registros
    findMany: async (filters = null) => {
        try {
            const result = await prisma.muscleGroups.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudieron obtener los grupos musculares",400)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.muscleGroups.update(
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
            throw formatError("No se pudo actualizar el grupo muscular",400)
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.muscleGroups.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            if (error.code === "P2025") {
                throw formatError("El grupo muscular que intentas eliminar no existe en la base de datos!", "NOT_FOUND")
            }
            throw formatError("No se pudo eliminar el grupo muscular",400)
        }
    }
}

export { muscleGroupService }
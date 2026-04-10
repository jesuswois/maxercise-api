import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const muscleGroupService = {
    create: async (element) => {
        try {
            const { authorId, ...groupData } = element;
            const result = await prisma.muscleGroups.create(
                {
                    data: {
                        ...groupData,
                        author: authorId ? { connect: { id: authorId } } : undefined
                    }
                }
            )
            return result
        } catch (error) {
            console.error("🚨 ERROR REAL DE PRISMA (muscleGroup):", error);
            throw formatError("No se pudo crear el grupo muscular",500)
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
            throw formatError("No se pudo obtener el grupo muscular",500)
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
            throw formatError("No se pudieron obtener los grupos musculares",500)
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
            throw formatError("No se pudo actualizar el grupo muscular",500)
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
                throw formatError("El grupo muscular que intentas eliminar no existe en la base de datos!", 404)
            }
            throw formatError("No se pudo eliminar el grupo muscular",500)
        }
    }
}

export { muscleGroupService }
import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const skeletonService = {
    create: async (element) => {
        try {
            const result = await prisma.skeleton.create(
                {
                    data: {
                        ...element
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo crear el esqueleto", 500)
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
            console.log(error)
            throw formatError("No se pudo obtener el esqueleto", 500)
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
            console.log(error)
            throw formatError("No se pudieron obtener los esqueletos", 500)
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
            console.log(error)
            throw formatError("No se pudo actualizar el esqueleto", 500)
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
            console.log(error)
            if (error.code === "P2025") {
                throw formatError("El esqueleto que intentas eliminar no existe en la base de datos!", 404)
            }
            throw formatError("No se pudo eliminar el esqueleto", 500)
        }
    }
}

export { skeletonService }
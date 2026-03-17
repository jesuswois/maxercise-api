import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const muscleService = {
    create: async (muscle) => {
        try {
            const result = prisma.muscle.create(
                {
                    data: {
                        ...muscle
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo crear el músculo",500)
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.muscle.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo obtener el músculo",500)
        }
    },
    // Retorna todos los registros
    findMany: async (filters = null) => {
        try {
            const result = await prisma.muscle.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudieron obtener los músculos",500)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.muscle.update(
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
            throw formatError("No se pudo actualizar el músculo",500)
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.muscle.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            if (error.code === "P2025") {
                throw formatError("El músculo que intentas eliminar no existe en la base de datos!", 404)
            }
            throw formatError("No se pudo eliminar el músculo",500)
        }
    }
}

export { muscleService }
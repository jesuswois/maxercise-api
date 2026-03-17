import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const exerciseMusclesService = {
    create: async (element) => {
        try {
            const result = await prisma.exerciseMuscles.create(
                {
                    data: {
                        ...element
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo crear el músculo de ejercicio", 500)
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.exerciseMuscles.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudo obtener el músculo de ejercicio", 500)
        }
    },
    // Retorna todos los registros
    findMany: async (filters = null) => {
        try {
            const result = await prisma.exerciseMuscles.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("No se pudieron obtener los músculos de ejercicio", 500)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.exerciseMuscles.update(
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
            throw formatError("No se pudo actualizar el músculo de ejercicio", 500)
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.exerciseMuscles.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error)
            if (error.code === "P2025") {
                throw formatError("El músculo de ejercicio que intentas eliminar no existe en la base de datos!", 404)
            }
            throw formatError("No se pudo eliminar el músculo de ejercicio", 500)
        }
    }
}

export { exerciseMusclesService }
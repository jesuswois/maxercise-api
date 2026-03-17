import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const routineExerciseService = {
    create: async (element) => {
        try {
            const result = prisma.routineExercise.create(
                {
                    data: {
                        ...element
                    }
                }
            )
            return result
        } catch (error) {
            throw formatError("No se pudo crear el ejercicio de rutina", 500)
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.routineExercise.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudo obtener el ejercicio de rutina", 500)
        }
    },
    // Retorna todos los registros
    findMany: async (routine_id) => {
        try {
            const result = await prisma.routineExercise.findMany({
                where:{
                    routine_id: routine_id
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudieron obtener los ejercicios de rutina", 500)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.routineExercise.update(
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
            throw formatError("No se pudo actualizar el ejercicio de rutina", 500)
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.routineExercise.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            if (error.code === "P2025") {
                throw formatError("El ejercicio de rutina que intentas eliminar no existe en la base de datos!", 404)
            }
            throw formatError("No se pudo eliminar el ejercicio de rutina", 500)
        }
    }
}

export { routineExerciseService }
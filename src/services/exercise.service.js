import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'

const exerciseService = {
    create: async (exercise) => {
        try {
            const result = prisma.exercise.create(
                {
                    data: {
                        
                        //...exercise,

                    }
                }
            )
            return result
        } catch (error) {
            throw formatError("No se pudo crear el ejercicio")
        }
    },
    createMany: async (exercises) => {
        try {
            const result = await prisma.exercise.createMany(
                {
                    data: [...exercises]
                }
            )
            return result
        } catch (error) {
           throw formatError("No se pudieron crear los ejercicios")
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.exercise.findFirst({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudo obtener el ejercicio")
        }
    },
    // Retorna todos los registros
    findMany: async (filters = null) => {
        try {
            const result = await prisma.exercise.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudieron obtener los ejercicios")
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.exercise.update(
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
            throw formatError("No se pudo actualizar el ejercicio")
        }
    },
    updateMany: async (where, data) => {
        try {
            // 'Where' es un objeto, el cual contiene la propiedad y el valor de la clausula necesario
            // para la clausula WHERE.
            /*
                EJ:
                    {
                        title: Press de banca
                    }
            */
            const result = await prisma.exercise.updateMany({
                where:{
                    ...where
                },
                data:{
                    ...data
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudieron actualizar los ejercicios")
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.exercise.delete({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            if (error.code === "P2025") {
                throw formatError("El ejercicio que intentas eliminar no existe en la base de datos!", "NOT_FOUND")
            }
            throw formatError("No se pudo eliminar el ejercicio",400)
        }
    },
    deleteMany: async (where) => {
        try {
            const result = await prisma.exercise.deleteMany({
                where:{
                    ...where
                }
            })
            return result
        } catch (error) {
            throw formatError("No se pudieron eliminar los ejercicios")
        }
    }
}

export { exerciseService }
import { prisma } from '../config/prisma'
import formatError from '../utils/formatError'
/*
Create
- Debe tener 
- 
- 
*/

const routineService = {
    create: async (routine) => {
        try {
            const result = await prisma.routine.create({
                data: {
                    ...routine
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("Error al intentar crear una rutina", 400)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.routine.update({
                where: {
                    id
                },
                data: {
                    ...routine
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("Error al intentar actualizar una rutina", 400)
        }
    },
    deleteOne: async (id) => {
        try {
            const result = await prisma.routine.delete({
                where: {
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("Error al intentar eliminar la rutina", 400)
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.routine.findFirst(
                {
                    where: {
                        id
                    },
                    include: {
                        exercises: true
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
            throw formatError("Error al intentar retornar rutina", 400)
        }
    },
    findMany: async (filters = null) => {
        try {
            const result = await prisma.routine.findMany({
                where: {
                    ...filters
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("Error al intentar consultar rutinas", 400)
        }
    }
}

export { routineService }
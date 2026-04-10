import { prisma } from '../config/prisma.js'
import formatError from '../utils/formatError.js'
/*
Create
- Debe tener 
- 
- 
*/

const routineService = {
    create: async (routine) => {
        try {
            const { authorId, ...routineData } = routine;
            const result = await prisma.routine.create({
                data: {
                    ...routineData,
                    author: authorId ? { connect: { id: authorId } } : undefined
                }
            })
            return result
        } catch (error) {
            console.error("🚨 ERROR REAL DE PRISMA (routine):", error);
            throw formatError("Error al intentar crear una rutina", 500)
        }
    },
    updateOne: async (id, data) => {
        try {
            const result = await prisma.routine.update({
                where: {
                    id
                },
                data: {
                    ...data
                }
            })
            return result
        } catch (error) {
            console.log(error)
            throw formatError("Error al intentar actualizar una rutina", 500)
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
            throw formatError("Error al intentar eliminar la rutina", 500)
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
            throw formatError("Error al intentar retornar rutina", 500)
        }
    },
    findMany: async (filters = {}) => {
        try {
            const result = await prisma.routine.findMany({
                where: {
                    ...filters
                }
            })
            return result
        } catch (error) {
            console.error("🚨 ERROR EN FINDMANY (routine):", error);
            throw formatError("No se pudieron obtener las rutinas",500)
        }
    }
}

export { routineService }
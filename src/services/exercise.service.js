import { prisma } from '../config/prisma.js'

/*
Create
-insert
-insertMany

Read
- get
- getAll

Update
- update
- updateMany

Delete
-delete
-deleteMany

*/
const exerciseService = {
    create: async (exercise) => {
        try {
            const result = prisma.exercise.create(
                {
                    data: {
                        ...exercise
                    }
                }
            )
            return result
        } catch (error) {
            throw error
        }
    },
    createMany: async (exercises) => {
        try {
            const exercises = req.body
            const result = await prisma.exercise.createMany(
                {
                    data: [...exercises]
                }
            )
            return result
        } catch (error) {
           throw error
        }
    },
    findOne: async (id) => {
        try {
            const result = await prisma.exercise.findUnique({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            throw error
        }
    },
    // Retorna todos los registros
    findMany: async (filters) => {
        try {
            const result = await prisma.exercise.findMany({
                where:{
                    // Filters
                    ...filters
                }
            })
            return result
        } catch (error) {
            throw error
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
            throw error
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
            throw error
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
            throw error
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
            throw error
        }
    }
}

export { exerciseService }
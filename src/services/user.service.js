import { prisma } from "../config/prisma.js"
import jwtHelper from "../utils/libraries/jwtHelper.js"
import bcryptHelper from "../utils/libraries/bcryptHelper.js"
import formatError from "../utils/formatError.js"

const userService = {
    // Authorization
    register: async (user) => {
        try{
            const result = await prisma.user.create({
                data:{
                    ...user,
                    password: await bcryptHelper.apply(user.password)
                }
            })
            return result;
        }catch(error){
            throw formatError("No se pudo crear el usuario", 500)
        }
    },
    // Verificación
    login: async (email,password) => {
        try{
            const user = await prisma.user.findFirst({
                where:{
                    email
                }
            })
            if(!user) throw formatError("Correo o contraseña incorrecta", 404)

            // Verificar contraseña
            const isPasswordValid = await bcryptHelper.compare(password,user.password)
            if(!isPasswordValid) throw formatError("Correo o contraseña incorrecta", 404)
            
            // Generar token
            return jwtHelper.sign({id:user.id,role:user.role})
        }catch(error){
            throw {message:error.message}
        }
    },
    verifyEmail: async (email) => {
        try{
            const user = await prisma.user.findFirst({
                where:{
                    email
                }
            })
            return user ? true : false;
        }catch(error){
            console.log(error)
            throw formatError("No se pudo verificar el correo", 500)
        }
    },
    verifyPhone: async (phone) => {
        try{
            const user = await prisma.user.findFirst({
                where:{
                    phone_number:phone
                }
            })
            return user ? true : false;
        }catch(error){
            console.log(error)
            throw formatError("No se pudo verificar el teléfono", 500)
        }
    },
    findOne: async (id) => {
        try{
            const user = await prisma.user.findFirst({
                where: {
                    id
                }
            })
            return user;
        }catch(error){
            console.log(error)
            throw formatError("No se pudo encontrar el usuario", 500)
        }
    },
    updateOne: async (id, data) => {
        try{
            const user = await prisma.user.update({
                where: { id },
                data
            })
            return user;
        }catch(error){
            throw formatError("No se pudo actualizar el usuario", 500)
        }
    }
}

export { userService };
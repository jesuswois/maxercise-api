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
            throw formatError("No se pudo crear el usuario")
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
            if(!user) throw formatError("Correo o contraseña incorrecta")

            // Verificar contraseña
            const isPasswordValid = await bcryptHelper.compare(password,user.password)
            if(!isPasswordValid) throw formatError("Correo o contraseña incorrecta")
            
            // Generar token
            return jwtHelper.generateToken({id:user.id,role:user.role})
        }catch(error){
            throw formatError("No se pudo iniciar sesión")
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
            throw formatError("No se pudo verificar el correo")
        }
    },
    verifyPhone: async (phone) => {
        try{
            const user = await prisma.user.findFirst({
                where:{
                    phone
                }
            })
            return user ? true : false;
        }catch(error){
            throw formatError("No se pudo verificar el teléfono")
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
            throw formatError("No se pudo encontrar el usuario")
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
            throw formatError("No se pudo actualizar el usuario")
        }
    }
}

export { userService };
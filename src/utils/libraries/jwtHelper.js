import * as jwt from 'jsonwebtoken'

// Inicialización y configuración
const jwtHelper = {
    sign: (data) => {
        return jwt.default.sign(
            {
                ...data
            },
            // Secret
            process.env.JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: "1h"
            }
        )
    },
    decode: (text) => {
        return jwt.default.decode(text)
    },
    verify: (text) => {
        try {
            return jwt.default.verify(text, process.env.JWT_SECRET)
        } catch (err) {
            if(err.name=="JsonWebTokenError") return {message:"Token no proporcionado!", status:false}
            if(err.name=="TokenExpiredError") return {message:"Token expirado!",status:false}
            if(err.name=="NotBeforeError") return {message:"Token aún no activo!",status:false}
            return {message:"Error desconocido",data:err,status:false}
        }
    }
}

export default jwtHelper
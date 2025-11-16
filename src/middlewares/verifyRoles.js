import jwtHelper from "../utils/jwtHelper.js"

// Asume que JWT existe.
export default (role) => {
    return (req,res,next)=>{
        try{
            const decodedToken = jwtHelper.decode(req.token)
            // Verificar roles (El rol SUPER siempre tendra acceso)
            if(decodedToken.role=="SUPER" || decodedToken.role!=role) return res.status(400).json({"message":"Sin autorización!"})
            next()
        }catch(err){
            console.log(err)
            return res.status(400).json({"message":"Sesión no encontrada!","information":err})
        }
    }
}
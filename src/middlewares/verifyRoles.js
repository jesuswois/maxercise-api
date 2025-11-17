// Siempre pasara despues de verifyJWT
export default (role) => {
    return (req,res,next)=>{
        try{
            // Verificar roles (El rol SUPER siempre tendra acceso)
            if(req.role!="SUPER" || req.role!=role) return res.status(400).json({"message":"Sin autorización!"})
            next()
        }catch(err){
            console.log(err)
            return res.status(400).json({"message":"Sesión no encontrada!","information":err})
        }
    }
}
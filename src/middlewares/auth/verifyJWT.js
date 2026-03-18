import jwtHelper from "../../utils/libraries/jwtHelper.js";

// Adhiere los metadatos al request.
export default (req, res, next) => {

    if (!req.headers.authorization) return res.status(400).json({ "message": "Token no proporcionado!" })

    const token = req.headers.authorization.split('Bearer ')[1]
    const verification = jwtHelper.verify(token)

    // Si verification es un objeto, entonces hubo error
    if (verification && verification.message) return res.status(400).json({ "message": verification.message })
    
    // Se incrustan los metadatos en el objeto de request
    const decodedToken = jwtHelper.decode(token)
    req.id = decodedToken.id
    req.role = decodedToken.role

    next()
}
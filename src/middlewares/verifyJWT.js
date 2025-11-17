import jwtHelper from "../utils/jwtHelper.js";

// Adhiere los metadatos al request.
export default (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1]
    console.log(token)
    if (!token) return res.status(400).json({"message": "Token no proporcionado!"})
    const verification = jwtHelper.verify(token)
    // Si verification es un objeto, entonces hubo error
    if (!verification) return res.status(400).json({"message":"Token invalido!"})
    if (verification && verification.message) return res.status(400).json({ "message": verification.message })
    // Se incrustan los metadatos en el objeto de request
    const decodedToken = jwtHelper.decode(token)
    req.id = decodedToken.id
    req.role = decodedToken.role
    next()
}
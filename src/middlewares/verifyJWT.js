import jwtHelper from "../utils/jwtHelper.js";

export default (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1]
    console.log(token)
    if (!token) return res.status(400).json({"message": "Token no proporcionado!"})
    const verification = jwtHelper.verify(token)
    // Si verification es un objeto, entonces hubo error
    if (!verification) return res.status(400).json({"message":"Token invalido!"})
    if (verification.message) return res.status(400).json({ "message": verification.message })
    // Se incrusta el token en el objeto de request
    req.token = token
    next()
}
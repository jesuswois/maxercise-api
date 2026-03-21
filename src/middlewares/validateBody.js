import verifyBodyData from "../utils/verifyBodyData"

export default (properties) => {
    return (req, res, next) => {
        if (!req.body) return res.status(400).json({ message: "El cuerpo de la petición esta vacio!" })
        const verificationResult = verifyBodyData(properties, req.body)
        if (!verificationResult.isValid) return res.status(400).json({ message: verificationResult.message })
        next()
    }
}
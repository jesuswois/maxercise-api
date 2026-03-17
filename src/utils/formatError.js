export default function formatError(customMessage="Ocurrió un Error en el servidor",code) {
    const error = new Error(customMessage)
    error.code = code
    return error
}
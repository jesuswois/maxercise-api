export default function formatError(customMessage="Ocurrió un Error en el servidor",code) {
    return {
        message: customMessage,
        code:code
    };
}
import validation from "../utils/validation";
import { userService } from "../services/user.service.js";
import formatError from "../utils/formatError.js";

export const validateNewUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, phone_number, role = "NORMAL" } = req.body

        // Validaciones
        if (!validation.user.email(email)) throw formatError("El formato del correo es inválido")
        if (!validation.user.password(password)) throw formatError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número")
        if (!validation.user.phone_number(phone_number)) throw formatError("El formato del número telefónico es inválido")
        if (!validation.user.first_name(first_name) || !validation.user.last_name(last_name)) throw formatError("El nombre o apellido contiene caracteres inválidos")

        const isEmailUsed = await userService.verifyEmail(email)
        const isPhoneUsed = await userService.verifyPhone(phone_number)

        if (isEmailUsed) throw formatError("El correo electrónico ya está en uso")
        if (isPhoneUsed) throw formatError("El número de teléfono ya está en uso")

        req.data = { first_name, last_name, email, password, phone_number, role }

        next()
    } catch (error) {
        return res.status(400).json({ message: error.message || "Ha ocurrido un error!" })
    }

}
export const validateUpdatedUser = (req, res, next) => {
    try {
        const { first_name, last_name, email, password, role } = req.body
        if (!first_name && !last_name && !email && !password && !role) {
            return res.status(400).json({ message: "Debes proporcionar datos para actualizar!" })
        }
        req.data = {}
        for (const e of Object.keys(req.body)) {
            if (["first_name", "last_name", "email", "password", "role"].includes(e)) {
                if (validation.user[e](req.body[e])) {
                    req.data[e] = req.body[e]
                } else {
                    return res.status(400).json({ message: `Error de validación en el campo ${e}` })
                }
            }
        }
        next()
    } catch (error) {
        return res.status(400).json({ message: error.message || "Ha ocurrido un error!" })
    }
}
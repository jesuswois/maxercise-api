import { userService } from '../services/user.service.js'
const userController = {
    findUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id)
            const result = await userService.findOne({id})
            return res.status(200).json({ message: "Usuario retornado correctamente!", data: { result } })
        } catch (error) {
            next(error)
        }
    },
    register: async (req, res, next) => {
        try {
            const result = await userService.register(req.data)
            return res.status(201).json({ message: "Usuario registrado correctamente!", data: { result } })
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const email =  req.body?.email;
            const password = req.body?.password;
            const token = await userService.login(email, password)
            return res.status(200).json({ message: "Inicio de sesión exitoso!", data: { token } })
        } catch (error) {
            next(error)
        }
    },
    updateUser: async (req, res, next) => {
        try {

            const id = parseInt(req.params.id)
            const result = await userService.updateOne(id, req.body)

            return res.status(200).json({ message: "Usuario actualizado correctamente!", data: { result } })
        } catch (error) {
            next(error)
        }
    }
}

export { userController }
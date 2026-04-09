import express from 'express'
import morgan from 'morgan'
import { userRouter } from './routes/user.routes.js'
import { adminRouter } from './routes/admin.routes.js'

const app = express()

// Configuración
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use((error, req, res, next) => {
    console.error(error)
    // In test environment, include stack and error object
    if (process.env.NODE_ENV === 'test') {
        return res.status(error.status || 500).json({
            message: error.message || "Ha ocurrido un error!",
            stack: error.stack,
            error: error
        })
    }
    return res.status(error.status || 500).json({ message: error.message || "Ha ocurrido un error!" })
})

// Enrutamiento
app.use('/user', userRouter)
app.use('/admin',adminRouter)

export default app
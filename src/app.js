import express from 'express'
import morgan from 'morgan'
import { userRouter } from './routes/user.routes.js'
import { adminRouter } from './routes/admin.routes.js'

const app = express()

// Configuración
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Enrutamiento
app.use('/user', userRouter)
app.use('/admin',adminRouter)

export default app 
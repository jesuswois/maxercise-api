import express from 'express'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'
import { userRouter } from './routes/user.routes.js'

const app = express()
const prisma = new PrismaClient()

// Configuración
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Enrutamiento
app.use('/user', userRouter)

export default app 
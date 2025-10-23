import express from 'express'
import morgan from 'morgan'

const app = express()

// Configuración
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Enrutamiento
app.use('/',(req,res)=>{
    res.send({"message":"Hello world!"})
})

export default app 
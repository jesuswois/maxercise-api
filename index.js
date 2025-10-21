import express from 'express'
import morgan from 'morgan'

const server = express()

// Configuración
server.use(express.urlencoded({ extended: false }))
server.use(morgan('dev'))

// Enrutamiento
server.use('/',(req,res)=>{
    res.send({"message":"Hello world!"})
})

// Estableciendo variables
server.set("port", 3000)

// Montando servidor
server.listen(server.get("port"), () => {
    console.log("Server running in port " + server.get("port"))
})
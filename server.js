import {default as server} from "./src/app.js"
import { PORT } from "./src/config/constants.js"
import dotenv from 'dotenv'
dotenv.config()

// Montando servidor
server.listen(PORT, () => {
    console.log("Server running in port " + PORT)
})
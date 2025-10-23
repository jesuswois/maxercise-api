import {default as server} from "./src/app.js"
import { PORT } from "./src/config/constants.js"


// Montando servidor
server.listen(PORT, () => {
    console.log("Server running in port " + PORT)
})
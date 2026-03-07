import validation from "../utils/validation.js";
import verifyBodyData from "../utils/verifyBodyData.js";

export const verifyRoutineData = async (req, res, next) => {
    // Verificar cuerpo de la petición y campos requeridos
    if (!req.body) return res.status(400).json({ message: "El cuerpo de la petición esta vacio!" })
    const verificationResult = verifyBodyData(["title", "description","difficulty","body_type","author_id"],req.body)
    if (!verificationResult.success) return res.status(400).json({ message: verificationResult.message })
    next()
}

export const verifyNewRoutineData = async (req, res, next) => {
    // Verificar cuerpo de la petición y campos requeridos
    if (!req.body) return res.status(400).json({ message: "El cuerpo de la petición esta vacio!" })
    const verificationResult = verifyBodyData(["title", "description","difficulty","body_type","author_id"],req.body)
    if (!verificationResult.success) return res.status(400).json({ message: verificationResult.message })
    next()
}

export const validateNewRoutine = (req,res,next) => {
    // Verificar si el cuerpo de la petición es un array o un objeto, y verificar existencia de campos requeridos en consecuencia
    if(Array.isArray(req.body)) {
        let error = false;
        let idxs = [];
        const formattedData = req.body.map((el,idx)=>{

            if(!el["title"] || !el["description"] || !el["difficulty"] || !el["body_type"] || !el["author_id"]) idxs.push(idx); error = true

            return {title: el["title"], description: el["description"], difficulty: el["difficulty"], body_type: el["body_type"], author_id: el["author_id"]}
        })
        if(error) return res.status(400).json({message:`Los formatos de los elementos en las posiciones: ${idxs.map(el=>el+", ")} estan incorrectos.`})
        req.data=formattedData
        next()
    } else {
        const body = req.body

        // Verificar presencia de campos requeridos
        if(!body["title"]) return res.status(400).json({message:"El título es un campo obligatorio!"})
        if(!body["description"]) return res.status(400).json({message:"La descripción es un campo obligatorio!"})
        if(!body["difficulty"]) return res.status(400).json({message:"La dificultad es un campo obligatorio!"})
        if(!body["body_type"]) return res.status(400).json({message:"El tipo de cuerpo es un campo obligatorio!"})
        if(!body["author_id"]) return res.status(400).json({message:"El id del autor es un campo obligatorio!"})


        req.data = {title: body["title"], description: body["description"], difficulty: body["difficulty"], body_type: body["body_type"], author_id: body["author_id"]}

        next()
    }
}
export const validateUpdatedRoutine = (req,res,next)=>{
    // Verifica que el cuerpo de la petición no esté vacío y que contenga al menos uno de los campos a actualizar
    const body = req.body
    if(!body["title"] && !body["description"] && !body["difficulty"] && !body["body_type"] && !body["author_id"]) return res.status(400).json({message:"Debes proporcionar datos para actualizar!"})
    let dataObject = {}
    let error = {found:false,message:null}
    Object.keys(req.body).map((e)=>{
        if(e=="title" || e=="description" || e=="difficulty" || e=="body_type" || e=="author_id"){
            if(validation.routine[e](req.body[e])) 
                dataObject[e]=req.body[e]
            else
                error.found=true; error.message=`Error de validación en el campo ${e}`
        }
    })
    if(error.found) return res.status(400).json({message:error.message})
    req.data = dataObject
    next()
}
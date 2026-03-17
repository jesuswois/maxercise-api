import validation from "../utils/validation.js";
import verifyBodyData from "../utils/verifyBodyData.js";

export const verifyMuscleData = async (req, res, next) => {
    if (!req.body) return res.status(400).json({ message: "El cuerpo de la petición esta vacio!" })
    const verificationResult = verifyBodyData(["name", "description","muscle_group_id"],req.body)
    if (!verificationResult.success) return res.status(400).json({ message: verificationResult.message })
    next()
}

export const verifyNewMuscleData = async (req, res, next) => {
    if (!req.body) return res.status(400).json({ message: "El cuerpo de la petición esta vacio!" })
    const verificationResult = verifyBodyData(["name", "description","muscle_group_id"],req.body)
    if (!verificationResult.success) return res.status(400).json({ message: verificationResult.message })
    next()
}

export const validateNewMuscle = (req,res,next) => {
    if(Array.isArray(req.body)) {
        let error = false;
        let idxs = [];
        const formattedData = req.body.map((el,idx)=>{

            if(!el["name"] || !el["description"] || !el["muscle_group_id"]) idxs.push(idx); error = true

            return {name: el["name"], description: el["description"], muscleGroupId: el["muscle_group_id"]}
        })
        if(error) return res.status(400).json({message:`Los formatos de los elementos en las posiciones: ${idxs.map(el=>el+", ")} estan incorrectos.`})
        req.data= {...formattedData, author_id: req.id}
        next()
    } else {
        const body = req.body

        // Verificar presencia de campos requeridos
        if(!body["name"]) return res.status(400).json({message:"El nombre es un campo obligatorio!"})
        if(!body["description"]) return res.status(400).json({message:"La descripcion es un campo obligatorio!"})
        if(!body["muscle_group_id"]) return res.status(400).json({message:"El ID del grupo muscular es un campo obligatorio!"})

        req.data = {name: body["name"], description: body["description"], muscleGroupId: body["muscle_group_id"]}

        next()
    }
}
export const validateUpdatedMuscle = (req,res,next)=>{
    const body = req.body
    if(!body["name"] && !body["description"] && !body["muscle_group_id"]) return res.status(400).json({message:"Debes proporcionar datos para actualizar!"})
    // 
    let dataObject = {}
    let error = {found:false,message:null}
    Object.keys(req.body).map((e)=>{
        if(e=="name" || e=="description" || e=="muscle_group_id"){
            if(validation.muscle[e](req.body[e])) 
                dataObject[e]=req.body[e]
            else
                error.found=true; error.message=`Error de validación en el campo ${e}`
        }
    })
    if(error.found) return res.status(400).json({message:error.message})
    req.data = dataObject
    next()
}
import validation from "../utils/validation.js";
import verifyBodyData from "../utils/verifyBodyData.js";

export const verifyRoutineExerciseData = async (req, res, next) => {
    if (!req.body) return res.status(400).json({ message: "El cuerpo de la petición esta vacio!" })
    const verificationResult = verifyBodyData(["reps", "sets","routine_id","exercise_id"],req.body)
    if (!verificationResult.success) return res.status(400).json({ message: verificationResult.message })
    next()
}

export const validateGetRoutineData = async (req,res,next) => {
    if(!req.params) return res.status(400).json({message:"No se han proporcionado parametros!"})
    if(req.params?.routine_exercise_id){
        if(!req.params?.routine_exercise_id) return res.status(400).json({message:"El ID del ejercicio de la rutina es requerido!"})
        if(isNaN(parseInt(req.params.routine_exercise_id))) return res.status(400).json({message:"El ID del ejercicio de la rutina debe ser un numero!"})
        req.data = {routine_exercise_id: parseInt(req.params.routine_exercise_id)}
        next()
    }
    if(req.params?.routine_id){
        if(!req.params?.routine_id) return res.status(400).json({message:"El ID de la rutina es requerido!"})
        if(isNaN(parseInt(req.params.routine_id))) return res.status(400).json({message:"El ID de la rutina debe ser un numero!"})
        req.data = {routine_id: parseInt(req.params.routine_id)}
        next()
    }
}

export const validateNewRoutineExercise = (req,res,next) => {
    if(Array.isArray(req.body)) {
        let error = false;
        let idxs = [];
        const formattedData = req.body.map((el,idx)=>{

            if(!el["reps"] || !el["sets"] || !el["routine_id"] || !el["exercise_id"]) idxs.push(idx); error = true

            return {reps: el["reps"], sets: el["sets"], routine_id: el["routine_id"], exercise_id: el["exercise_id"]}
        })
        if(error) return res.status(400).json({message:`Los formatos de los elementos en las posiciones: ${idxs.map(el=>el+", ")} estan incorrectos.`})
        req.data= {...formattedData, author_id: req.id}
        next()
    } else {
        const body = req.body

        // Verificar presencia de campos requeridos
        if(!body["reps"]) return res.status(400).json({message:"El nombre es un campo obligatorio!"})
        if(!body["sets"]) return res.status(400).json({message:"La descripcion es un campo obligatorio!"})
        if(!body["routine_id"]) return res.status(400).json({message:"El ID de la rutina es un campo obligatorio!"})
        if(!body["exercise_id"]) return res.status(400).json({message:"El ID del ejercicio es un campo obligatorio!"})

        req.data = {reps: body["reps"], sets: body["sets"], routine_id: body["routine_id"], exercise_id: body["exercise_id"], author_id: req.id}

        next()
    }
}
export const validateUpdatedRoutineExercise = (req,res,next)=>{
    const body = req.body
    if(!body["reps"] && !body["sets"] && !body["routine_id"] && !body["exercise_id"]) return res.status(400).json({message:"Debes proporcionar datos para actualizar!"})
    // 
    let dataObject = {}
    let error = {found:false,message:null}
    Object.keys(req.body).map((e)=>{
        if(e=="reps" || e=="sets"){
            if(validation.restriction[e](req.body[e])) 
                dataObject[e]=req.body[e]
            else
                error.found=true; error.message=`Error de validación en el campo ${e}`
        }
        if(e=="routine_id" || e=="exercise_id") dataObject[e]=req.body[e]
    })
    if(error.found) return res.status(400).json({message:error.message})
    req.data = dataObject
    next()
}
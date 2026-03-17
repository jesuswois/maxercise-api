import validation from "../utils/validation.js";
import verifyBodyData from "../utils/verifyBodyData.js";

export const verifyUserRestrictionData = async (req, res, next) => {
    if (!req.body) return res.status(400).json({ message: "El cuerpo de la petición esta vacio!"})
    const verificationResult = verifyBodyData(["user_id", "restriction_id"],req.body)
    if (!verificationResult.success) return res.status(400).json({ message: verificationResult.message })
    next()
}

export const validateNewUserRestriction = (req,res,next) => {
    if(Array.isArray(req.body)) {
        let error = false;
        let idxs = [];
        const formattedData = req.body.map((el,idx)=>{

            if(!el["user_id"] || !el["restriction_id"]) idxs.push(idx); error = true

            return {user_id: el["user_id"], restriction_id: el["restriction_id"]}
        })
        if(error) return res.status(400).json({message:`Los formatos de los elementos en las posiciones: ${idxs.map(el=>el+", ")} estan incorrectos.`})
        req.data= {...formattedData, author_id: req.id}
        next()
    } else {
        const body = req.body

        // Verificar presencia de campos requeridos
        if(!body["name"]) return res.status(400).json({message:"El nombre es un campo obligatorio!"})
        if(!body["description"]) return res.status(400).json({message:"La descripcion es un campo obligatorio!"})

        req.data = {name: body["name"], description: body["description"]}

        next()
    }
}
export const validateUpdatedUserRestriction = (req,res,next)=>{
    const body = req.body
    if(!body["user_id"] && !body["restriction_id"]) res.status(400).json({message:"Debes proporcionar datos para actualizar!"})
    // 
    let dataObject = {}
    let error = {found:false,message:null}
    Object.keys(req.body).map((e)=>{
        if(e=="name" || e=="description"){
            if(validation.restriction[e](req.body[e])) 
                dataObject[e]=req.body[e]
            else
                error.found=true; error.message=`Error de validación en el campo ${e}`
        }
    })
    if(error.found) return res.status(400).json({message:error.message})
    req.data = dataObject
    next()
}
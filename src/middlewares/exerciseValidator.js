import validation from "../utils/validation.js";

export const validateNewExercise = (req,res,next) => {
    if(Array.isArray(req.body)) {
        let error = false;
        let idxs = [];
        const formattedData = req.body.map(el,idx=>{
            let {title, description, instructions, imageUrl} = el

            if(!title || !description || !instructions || !imageUrl) idxs.push(idx); error = true

            return {title,description,instructions,imageUrl,authorId:req.id}
        })
        if(error) return res.status(400).json({message:`Los formatos de los elementos en las posiciones: ${idxs.map(el=>el+", ")} estan incorrectos.`})
        req.data=formattedData
        next()
    } else {
        const {title, description, instructions, imageUrl="test"} = req.body

        // Verificar presencia de campos requeridos
        if(!title) return res.status(400).json({message:"El titulo es un campo obligatorio!"})
        if(!description) return res.status(400).json({message:"La descripcion es un campo obligatorio!"})
        if(!instructions) return res.status(400).json({message:"Las instrucciones son un campo obligatorio!"})
        if(!imageUrl) return res.status(400).json({message:"La imagen para guia visual es obligatoria!..."})

        req.data = {title,description,instructions,imageUrl,authorId:req.id}
        
        next()
    }
}
export const validateUpdatedExercise = (req,res,next)=>{
    const {title,description,instructions,imageUrl} = req.body
    if(!title && !description && !instructions && !imageUrl) return res.status(400).json({message:"Debes proporcionar datos para actualizar!"})
    // 
    let dataObject = {}
    let error = {found:false,message:null}
    Object.keys(req.body).map((e)=>{
        if(e=="title" || e=="description" || e=="instructions" || e=="imageUrl"){
            if(validation.exercise[e](req.body[e])) 
                dataObject[e]=req.body[e]
            else
                error.found=true; error.message=`Error de validación en el campo ${e}`
        }
    })
    if(error.found) return res.status(400).json({message:error.message})
    req.data = dataObject
    next()
}
export const validateNewExercise = (req,res,next) => {
    if(Array.isArray(req.body)) {
        let error = false;
        let idxs = [];
        const formattedData = req.body.map(el,idx=>{
            let {title, description, imageUrl} = el

            if(!title || !description || !imageUrl) idxs.push(idx); error = true

            return {title,description,imageUrl,authorId:req.id}
        })
        if(error) return res.status(400).json({message:`Los formatos de los elementos en las posiciones: ${idxs.map(el=>el+", ")} estan incorrectos.`})
        req.data=formattedData
        next()
    } else {
        const {title, description, imageUrl="test"} = req.body

        // Verificar presencia de campos requeridos
        if(!title) return res.status(400).json({message:"El titulo es un campo obligatorio!"})
        if(!description) return res.status(400).json({message:"La descripcion es un campo obligatorio!"})
        if(!imageUrl) return res.status(400).json({message:"La imagen para guia visual es obligatoria!..."})

        req.data = {title,description,imageUrl,authorId:req.id}
        
        next()
    }
}
export const validateUpdatedExercise = (req,res,next)=>{
    const {title,description,imageUrl} = req.body
    if(!title && !description && !imageUrl) return res.status(400).json({message:"Debes proporcionar datos para actualizar!"})
    // 
    let dataObject
    Object.keys(req.body).map(e=>{
        if(req){

        }
    })
    req.data = 
    next()
}
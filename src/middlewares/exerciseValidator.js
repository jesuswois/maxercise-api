export const validateExercise = (req,res,next) => {
    if(Array.isArray(req.body)) {
        let error = [];
        let idxs = [];
        const formattedData = req.body.map(el,idx=>{
            let {title, description, imageUrl} = el

            if(!title || !description || !imageUrl) idxs.push(idx)

            return {title,description,imageUrl,authorId:req.id}
        })
        if(error) return res.status(400).json({message:`Los formatos de los elementos en las posiciones: ${idxs.map(el=>el+", ")} estan incorrectos`})
        req.data=formattedData
        next()
    } else {
        const {title, description, imageUrl="test"} = req.body

        if(!title) return res.status(400).json({message:"El titulo es un campo obligatorio!"})
        if(!description) return res.status(400).json({message:"La descripcion es un campo obligatorio!"})
        if(!imageUrl) return res.status(400).json({message:"La imagen para guia visual es obligatoria!..."})

        req.data = {title,description,imageUrl,authorId:req.id}
        
        next()
    }
}
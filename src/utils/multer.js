import multer from "multer";

// Configuración de Storage
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname)
    }
})

// Instanciación de multer
const upload = multer({storage:storage})

export { upload }
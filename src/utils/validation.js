export default {
    exercise:{
        title:(data)=>{
            // Es menor a 50 caracteres? ¿Contiene caracteres especiales?
            return data.length<=50 && data.length>5
        },
        description:(data)=>{
            // ¿Es menor a 300 caracteres? y ¿Contiene caracteres especiales? 
            return data.length<=300 && data.length>15
        },
        instructions:(data)=>{
            return data.length<=2000 && data.length>25
        },
        imageUrl:(data)=>{
            // Pending
            return true
        }
    },
    routine:{
        title:(data)=>{
            // Es menor a 50 caracteres? ¿Contiene caracteres especiales?
            return data.length<=50 && data.length>5
        },
        description:(data)=>{
            // ¿Es menor a 300 caracteres? y ¿Contiene caracteres especiales? 
            return data.length<=300 && data.length>15
        },
        difficulty:(data)=>{
            return ["PRINCIPIANTE","INTERMEDIO","AVANZADO"].includes(data)
        },
        body_type:(data)=>{
            return ["ENDOMORFO","ECTOMORFO","MESOMORFO"].includes(data)
        }
    },
    muscle:{
        name:(data)=>{
            return data.length<=50 && data.length>5
        },
        description:(data)=>{
            return data.length<=300 && data.length>15
        }
    },
    muscle_group:{
        name:(data)=>{
            return data.length<=50 && data.length>5
        },
        description:(data)=>{
            return data.length<=300 && data.length>15
        }
    },
    user:{
        email:(data)=>{
            return /^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(data.trim())
        },
        first_name:(data)=>{
            return typeof data === 'string' && data.length<=35 && /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæœÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ,.'-]+$/.test(data.trim())
        },
        last_name:(data)=>{
            return typeof data === 'string' && data.length<=55 && /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæœÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ,.'-]+$/.test(data.trim()) 
        },
        phone_number:(data)=>{
            return typeof data === 'string' && (data.length<=15 && data.length>=8) && /^(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})$/.test(data.trim()) 
        },
        password:(data)=>{
            return typeof data === 'string' && /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\W]).{8,64})$/.test(data.trim()) 
        }
    }

}
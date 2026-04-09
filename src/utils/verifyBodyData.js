export default (dataExpected, body) => {
    // dataExpected es un arreglo de strings, los cuales representan las propiedades del body. 
    //  Retorna un objeto, del cual, se determinara el resultado de la revisión en la propiedad success,
    //  y el campo faltante en message. De otra forma, la propiedad message no existira.
    for (let data of dataExpected) {
        try {
            if (!body[data]) {
                return { success: false, message: `El campo ${data} es requerido` }
            }
        } catch (error) {
            // if(error.name == "TypeError") 
            return { success: false, message: `El campo ${data} es requerido` }
        }
    }
    return { success: true }
}
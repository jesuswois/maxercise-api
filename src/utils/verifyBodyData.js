export default (dataExpected, body) => {
    // dataExpected es un arreglo de strings, los cuales pretenden representar las propiedades del body. 
    //  Retorna objeto, del cual, se determinara el resultado de la revisión en la propiedad success,
    //  y el campo faltante en message. De otra forma, la propiedad message no existira.
    for (let data of dataExpected) {
        try {
            if (!body[data]) {
                return { success: false, message: `Falta el campo ${data}` }
            }
        } catch (error) {
            if(error.name == "TypeError")
            return { success: false, message: `Falta el campo ${data}` }
        }
    }
    return { success: true }
}
export default (mode) => {
    return (req, res, next) => {
        // Revisar si es un objeto o un string
        if(typeof mode === "string"){
            if(req.role!=mode && req.role!="SUPER") return res.status(400).json({"message":"Sin autorización!"})
            return next()
        }else if(typeof mode === "object"){
            switch(mode.keys()[0]){
                case "AND":{
                    const roles = mode.and
                    let authorized = true
                    roles.forEach(role => {
                        if(req.role!=role && req.role!="SUPER") {
                            authorized = false
                            return
                        }
                    });
                    if(!authorized) return res.status(400).json({"message":"Sin autorización!"})
                    return next()
                }
                case "OR":{
                    const roles = mode.or
                    let authorized = false
                    roles.forEach(role => {
                        if(req.role==role || req.role=="SUPER") {
                            authorized = true
                            return next()
                        }
                    });
                    if(authorized) return next()
                    return res.status(400).json({"message":"Sin autorización!"})
                }
            }
        }
    }
}
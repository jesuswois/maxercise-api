export default (mode) => {
    return (req, res, next) => {
        // Asegurarnos de que el usuario tenga un rol asignado
        if (!req.role) {
            return res.status(400).json({ message: "Sin autorización! (No hay rol)" });
        }

        // Revisar si es un string directo
        if (typeof mode === "string") {
            if (req.role !== mode && req.role !== "SUPER") {
                return res.status(400).json({ message: "Sin autorización!" });
            }
            return next();
        } 
        
        // Revisar si es un objeto { OR: [...] } o { AND: [...] }
        if (typeof mode === "object" && mode !== null) {
            const key = Object.keys(mode)[0];

            if (key === "AND") {
                const roles = mode.AND || [];
                let authorized = true;
                
                // Usamos for...of porque forEach no permite detener el flujo con return
                for (const role of roles) {
                    if (req.role !== role && req.role !== "SUPER") {
                        authorized = false;
                        break; // Rompemos el ciclo en cuanto falla uno
                    }
                }
                
                if (!authorized) {
                    return res.status(400).json({ message: "Sin autorización!" });
                }
                return next();
            }

            if (key === "OR") {
                const roles = mode.OR || [];
                
                // .includes() es perfecto para un OR: ¿El rol del usuario está en el arreglo?
                if (roles.includes(req.role) || req.role === "SUPER") {
                    return next(); // Aquí sí salimos de la función correctamente
                }
                
                return res.status(400).json({ message: "Sin autorización!" });
            }
        }

        // Por si mandan algo raro al middleware
        return res.status(500).json({ message: "Configuración de roles inválida" });
    }
}
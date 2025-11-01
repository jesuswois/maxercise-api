import * as jwt from 'jsonwebtoken'

const secret = "prueba123"
const jwtExample = jwt.default.sign({
    name: "Example"
}, "secretprivatekey",
    {
        algorithm: "HS256",
        expiresIn: 25
    })

const jwtHelper = {
    sign: (data) => {
        return jwt.default.sign({
            ...data
        },
            secret,
            {
                algorithm: "HS256",
                expiresIn: "5s"
            })
    },
    decode: (text) => {
        return jwt.default.decode(text)
    },
    verify: (text) => {
        try {
            return jwt.default.verify(text, secret)
        } catch (err) {
            console.log(err)
        }
    }
}
const example = jwtHelper.sign({ nombre: "hesuh", edad: 20, genero: "hell yeah" })

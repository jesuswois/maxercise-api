import * as bcrypt from 'bcrypt'
const saltNumber = 10
const hashed = await bcrypt.hash("brotherman",10)
const encryption = {
    apply: async (text) => {
        return await bcrypt.hash(text,saltNumber)
    },
    compare: async (text,hashedText) => {
        return await bcrypt.compare(text,hashedText)
    }
}
console.log("Test: "+hashed)
console.log(await bcrypt.compare("brotherman",hashed))
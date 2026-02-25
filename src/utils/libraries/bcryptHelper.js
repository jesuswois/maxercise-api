import * as bcrypt from 'bcrypt'
const saltNumber = 10

const bcryptHelper = {
    apply: async (text) => {
        return await bcrypt.hash(text,saltNumber)
    },
    compare: async (text,hashedText) => {
        return await bcrypt.compare(text,hashedText)
    }
}

export default bcryptHelper
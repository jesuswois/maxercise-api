import formatError from '../utils/formatError.js'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'

const getGroqApiKey = (apiKey = process.env.GROQ_API_KEY) => {
    if (!apiKey) {
        throw formatError('Falta la credencial GROQ_API_KEY', 500)
    }

    return apiKey
}

const groqService = {
    chatCompletion: async ({
        messages,
        model = DEFAULT_GROQ_MODEL,
        temperature = 0.7,
        max_tokens,
        top_p,
        stream = false,
        apiKey
    } = {}) => {
        if (!Array.isArray(messages) || messages.length === 0) {
            throw formatError('Se requiere un arreglo de mensajes para Groq', 400)
        }

        const token = getGroqApiKey(apiKey)

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                model,
                messages,
                temperature,
                ...(typeof max_tokens === 'number' ? { max_tokens } : {}),
                ...(typeof top_p === 'number' ? { top_p } : {}),
                stream
            })
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
            const message = data?.error?.message || 'No se pudo completar la solicitud a Groq'
            throw formatError(message, response.status)
        }

        return data
    }
}

export { groqService }
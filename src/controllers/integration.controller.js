import { emailService } from '../services/email.service.js'
import { groqService } from '../services/groq.service.js'
import { supabaseService } from '../services/supabase.service.js'

const integrationController = {
    sendEmail: async (req, res, next) => {
        try {
            const body = req.body ?? {}
            const result = await emailService.sendEmail(body)
            return res.status(200).json({ message: 'Email enviado correctamente!', data: result })
        } catch (error) {
            next(error)
        }
    },
    chatGroq: async (req, res, next) => {
        try {
            const body = req.body ?? {}
            const { message, messages, model, temperature, max_tokens, top_p, stream, apiKey } = body

            const payload = Array.isArray(messages)
                ? { messages, model, temperature, max_tokens, top_p, stream, apiKey }
                : {
                    messages: [{ role: 'user', content: message || body.prompt }],
                    model,
                    temperature,
                    max_tokens,
                    top_p,
                    stream,
                    apiKey
                }

            const result = await groqService.chatCompletion(payload)
            return res.status(200).json({ message: 'Respuesta de Groq obtenida correctamente!', data: result })
        } catch (error) {
            next(error)
        }
    },
    uploadSupabaseImage: async (req, res, next) => {
        try {
            const body = req.body ?? {}

            if (!req.file) {
                return res.status(400).json({ message: 'Se requiere una imagen en el campo file' })
            }

            const result = await supabaseService.uploadImage({
                bucket: body.bucket,
                path: body.path,
                file: req.file.buffer,
                contentType: req.file.mimetype,
                upsert: body.upsert === 'true',
                publicUrl: body.publicUrl !== 'false'
            })

            return res.status(200).json({ message: 'Imagen subida correctamente!', data: result })
        } catch (error) {
            next(error)
        }
    }
}

export { integrationController }
import { Router } from 'express'
import multer from 'multer'
import { integrationController } from '../controllers/integration.controller.js'

const integrationRouter = Router()
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

integrationRouter.post('/email', integrationController.sendEmail)
integrationRouter.post('/groq', integrationController.chatGroq)
integrationRouter.post('/supabase/image', upload.single('file'), integrationController.uploadSupabaseImage)

export { integrationRouter }
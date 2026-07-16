import nodemailer from 'nodemailer'
import formatError from '../utils/formatError.js'

const getEmailConfig = (config = {}) => {
    const host = config.host || process.env.SMTP_HOST
    const port = Number(config.port || process.env.SMTP_PORT || 587)
    const secure = config.secure ?? (process.env.SMTP_SECURE === 'true' || port === 465)
    const user = config.user || process.env.SMTP_USER
    const pass = config.pass || process.env.SMTP_PASS
    const from = config.from || process.env.SMTP_FROM || user

    if (!host) {
        throw formatError('Falta la credencial SMTP_HOST', 500)
    }

    if (!user) {
        throw formatError('Falta la credencial SMTP_USER', 500)
    }

    if (!pass) {
        throw formatError('Falta la credencial SMTP_PASS', 500)
    }

    if (!from) {
        throw formatError('Falta la credencial SMTP_FROM', 500)
    }

    return { host, port, secure, auth: { user, pass }, from }
}

const createEmailTransporter = (config = {}) => {
    const emailConfig = getEmailConfig(config)

    return nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure,
        auth: emailConfig.auth
    })
}

const emailService = {
    getTransporter: createEmailTransporter,
    verifyConnection: async (config = {}) => {
        const transporter = createEmailTransporter(config)
        await transporter.verify()

        return true
    },
    sendEmail: async ({ to, subject, text, html, from, ...config } = {}) => {
        if (!to) {
            throw formatError('Se requiere destinatario para enviar el email', 400)
        }

        if (!subject) {
            throw formatError('Se requiere asunto para enviar el email', 400)
        }

        if (!text && !html) {
            throw formatError('Se requiere text o html para enviar el email', 400)
        }

        const emailConfig = getEmailConfig({ from, ...config })
        const transporter = createEmailTransporter({ from, ...config })

        const result = await transporter.sendMail({
            from: emailConfig.from,
            to,
            subject,
            text,
            html
        })

        return {
            messageId: result.messageId,
            accepted: result.accepted,
            rejected: result.rejected,
            response: result.response
        }
    }
}

export { emailService }
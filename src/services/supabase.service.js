import { createClient } from '@supabase/supabase-js'
import formatError from '../utils/formatError.js'

const getSupabaseConfig = ({ url, key } = {}) => {
    const supabaseUrl = url || process.env.SUPABASE_URL
    const supabaseKey = key || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl) {
        throw formatError('Falta la credencial SUPABASE_URL', 500)
    }

    if (!supabaseKey) {
        throw formatError('Falta la credencial SUPABASE_SERVICE_ROLE_KEY o SUPABASE_ANON_KEY', 500)
    }

    return { supabaseUrl, supabaseKey }
}

const createSupabaseServiceClient = (credentials = {}) => {
    const { supabaseUrl, supabaseKey } = getSupabaseConfig(credentials)

    return createClient(supabaseUrl, supabaseKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}

const resolveUploadBody = (fileOrBody) => {
    if (!fileOrBody) return null

    if (Buffer.isBuffer(fileOrBody)) return fileOrBody
    if (fileOrBody instanceof Uint8Array) return fileOrBody
    if (fileOrBody.buffer) return fileOrBody.buffer

    return fileOrBody
}

const supabaseService = {
    getClient: createSupabaseServiceClient,
    from: (table, credentials = {}) => createSupabaseServiceClient(credentials).from(table),
    storage: (credentials = {}) => createSupabaseServiceClient(credentials).storage,
    auth: (credentials = {}) => createSupabaseServiceClient(credentials).auth,
    uploadImage: async ({
        bucket = 'images',
        path,
        file,
        body,
        contentType,
        upsert = false,
        publicUrl = true,
        ...credentials
    } = {}) => {
        const uploadBody = resolveUploadBody(file ?? body)

        if (!uploadBody) {
            throw formatError('Se requiere un archivo o body para subir la imagen', 400)
        }

        if (!path) {
            throw formatError('Se requiere un path para subir la imagen', 400)
        }

        const client = createSupabaseServiceClient(credentials)
        const uploadResult = await client.storage.from(bucket).upload(path, uploadBody, {
            contentType,
            upsert
        })

        if (uploadResult.error) {
            throw formatError(uploadResult.error.message || 'No se pudo subir la imagen', uploadResult.error.statusCode || 500)
        }

        const result = {
            path: uploadResult.data?.path,
            fullPath: uploadResult.data?.fullPath,
            bucket
        }

        if (publicUrl) {
            const publicResult = client.storage.from(bucket).getPublicUrl(uploadResult.data.path)
            result.publicUrl = publicResult.data.publicUrl
        }

        return result
    },
    getImageUrl: ({ bucket = 'images', path, ...credentials } = {}) => {
        if (!path) {
            throw formatError('Se requiere un path para obtener la imagen', 400)
        }

        const client = createSupabaseServiceClient(credentials)
        const publicResult = client.storage.from(bucket).getPublicUrl(path)

        return {
            bucket,
            path,
            publicUrl: publicResult.data.publicUrl
        }
    },
    downloadImage: async ({ bucket = 'images', path, ...credentials } = {}) => {
        if (!path) {
            throw formatError('Se requiere un path para descargar la imagen', 400)
        }

        const client = createSupabaseServiceClient(credentials)
        const downloadResult = await client.storage.from(bucket).download(path)

        if (downloadResult.error) {
            throw formatError(downloadResult.error.message || 'No se pudo descargar la imagen', downloadResult.error.statusCode || 500)
        }

        return {
            bucket,
            path,
            file: downloadResult.data
        }
    }
}

export { supabaseService }
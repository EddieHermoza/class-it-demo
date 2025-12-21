const path = require('path')
const fs = require('fs')

const API_URL_ENV = 'NEXT_PUBLIC_API_URL_SAVING_GENERATOR'
const apiName = 'classRoomApi'
const emptyApiName = 'emptySavingApi'

const projectDir = path.join(__dirname, '..')
const envPath = path.join(projectDir, '.env')

function loadEnvVariables() {
  if (!fs.existsSync(envPath)) {
    console.warn('⚠️  Archivo .env no encontrado, usando valores por defecto')
    return
  }

  try {
    let envContent = fs.readFileSync(envPath, 'utf8')

    if (envContent.includes('\x00') || envContent.charCodeAt(0) === 0xfeff) {
      envContent = fs.readFileSync(envPath, 'utf16le')
    }

    if (envContent.charCodeAt(0) === 0xfeff) {
      envContent = envContent.slice(1)
    }

    const envLines = envContent.split('\n')

    for (const line of envLines) {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim()
          process.env[key.trim()] = value
        }
      }
    }
  } catch (error) {
    console.warn('⚠️  Error leyendo archivo .env:', error)
  }
}

loadEnvVariables()

if (!process.env[API_URL_ENV]) {
  console.error('❌ Variables de entorno no encontradas')
  console.error(`💡 Asegúrate de tener ${API_URL_ENV} en tu archivo .env`)
  console.error('📁 Archivo .env esperado en:', projectDir)
  throw new Error(`${API_URL_ENV} is not defined in your environment variables`)
}

const apiUrl = process.env[API_URL_ENV]
const swaggerUrl = `${apiUrl}/openapi.json`

const generatedDir = path.join(projectDir, 'src', 'services', 'generated')
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true })
}

console.log('✅ API Generator Configuration:', {
  [API_URL_ENV]: apiUrl,
  'Project Directory': projectDir,
  'Schema URL': swaggerUrl,
})

const config = {
  apiFile: `@/modules/shared/store/${emptyApiName}.ts`,
  apiImport: emptyApiName,
  exportName: apiName,
  hooks: { lazyQueries: true, mutations: true, queries: true },
  outputFile: `../src/services/generated/${apiName}.generated.ts`,
  schemaFile: swaggerUrl,
  flattenArg: true,
  tag: true,
}

module.exports = config

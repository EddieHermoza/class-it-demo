const { spawn } = require('child_process')
const path = require('path')

// Configurar la variable de entorno para ts-node
process.env.TS_NODE_PROJECT = path.join(
  __dirname,
  '..',
  'tsconfig.scripts.json'
)

// Ejecutar el generador de RTK Query
const generator = spawn(
  'npx',
  ['@rtk-query/codegen-openapi', path.join(__dirname, 'api-generator.ts')],
  {
    stdio: 'inherit',
    shell: true,
  }
)

generator.on('close', (code) => {
  process.exit(code)
})

generator.on('error', (error) => {
  console.error('Error ejecutando el generador:', error)
  process.exit(1)
})

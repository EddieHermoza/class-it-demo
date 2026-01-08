const getApiUrl = () => {
  if (IS_PRODUCTION) {
    return 'https://api.class-it.edu.pe'
  }
  return process.env.NEXT_PUBLIC_DEVELOPMENT_API
}

const getApiGeneratorUrl = () => {
  return (
    process.env.NEXT_PUBLIC_API_URL_SAVING_GENERATOR ||
    process.env.NEXT_PUBLIC_API_URL
  )
}

export const API_URL = getApiUrl()
export const API_URL_SAVING_GENERATOR = getApiGeneratorUrl()
export const SANDBOX_MODE = process.env.SANDBOX_MODE === 'true'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

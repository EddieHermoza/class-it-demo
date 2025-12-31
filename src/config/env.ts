const getApiUrl = () => {
  if (IS_PRODUCTION) {
    return process.env.NEXT_PUBLIC_API
  } else if (IS_DEVELOPMENT) {
    return process.env.NEXT_PUBLIC_API_URL
  }
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

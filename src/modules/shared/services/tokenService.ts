import { API_URL } from '@/config/env'

export class TokenService {
  static async refreshTokens(refreshToken: string) {
    try {
      const response = await fetch(`${API_URL}/api/V1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        console.warn('⚠️  Error renovando tokens:', response.status)
        return null
      }

      const data = await response.json()

      if (!data.accessToken || !data.refreshToken) {
        console.warn('⚠️  Respuesta de tokens inválida')
        return null
      }

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }
    } catch (error) {
      console.error(
        '❌ Error renovando tokens:',
        error instanceof Error ? error.message : String(error)
      )
      return null
    }
  }

  static isTokenExpiringSoon(token: string) {
    if (!token) return true

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000
      const timeUntilExpiry = payload.exp - now

      return timeUntilExpiry < 300
    } catch {
      return true
    }
  }
}

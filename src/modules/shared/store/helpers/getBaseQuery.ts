/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { TokenService } from '../../services/tokenService'
import { useAuthStore } from '../auth.store'

const getAccessToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

const getRefreshToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refresh_token')
}

const updateTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
}

const clearTokens = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
}

const handleLogout = () => {
  clearTokens()
  useAuthStore.getState().logout()
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('auth:logout'))
    window.location.href = '/'
  }
}

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: any) => void
  reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

const baseQuery = ({ endpoint = '' }) =>
  fetchBaseQuery({
    baseUrl: endpoint,
    prepareHeaders: async (headers) => {
      const accessToken = getAccessToken()
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
      return headers
    },
  })

export const getBaseQuery = async (args: any, api: any, extraOptions: any) => {
  try {
    let result = await baseQuery(api)(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(() => {
              return baseQuery(api)(args, api, extraOptions)
            })
            .catch(() => {
              return result
            })
        }

        isRefreshing = true

        try {
          const newTokens = await TokenService.refreshTokens(refreshToken)

          if (newTokens) {
            updateTokens(newTokens.accessToken, newTokens.refreshToken)
            processQueue(null, newTokens.accessToken)
            result = await baseQuery(api)(args, api, extraOptions)
          } else {
            handleLogout()
            processQueue(new Error('Refresh failed'))
          }
        } catch (refreshError) {
          handleLogout()
          processQueue(refreshError)
        } finally {
          isRefreshing = false
        }
      } else {
        handleLogout()
      }
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

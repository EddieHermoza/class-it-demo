/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, useAuthActions } from '../store/auth.store'
import { useAuthControllerSignInMutation } from '@/services/generated/classRoomApi.generated'
import type { SignInDto } from '@/services/generated/classRoomApi.generated'
import { AuthContext, type AuthContextType } from '../context/auth-context'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter()

  const { isAuthenticated, isLoading, error, user } = useAuthStore()

  const {
    setCredentials,
    setLoading,
    setError,
    clearError,
    logout: storeLogout,
  } = useAuthActions()

  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] =
    useAuthControllerSignInMutation()

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true)

      storeLogout()

      // limpiar local storage
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')

      router.push('/login')
    } catch (error) {
      console.error('Error durante logout:', error)
      storeLogout()
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [storeLogout, router, setLoading])

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        setLoading(true)
        clearError()

        const result = await loginMutation(credentials as SignInDto).unwrap()

        // result es de tipo SignInResponseDto
        if (result && result.user && result.tokens) {
          const tokens = {
            accessToken: result.tokens.access,
            refreshToken: result.tokens.refresh,
          }

          setCredentials({
            user: result.user,
            tokens,
          })

          localStorage.setItem('access_token', result.tokens.access)
          localStorage.setItem('refresh_token', result.tokens.refresh)
          localStorage.setItem('user', JSON.stringify(result.user))

          router.push('/account-page')
        }
      } catch (error) {
        console.error('Error en login:', error)

        setError('Credenciales inválidas. Verifica tu email y contraseña.')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [loginMutation, clearError, setCredentials, setLoading, router, setError]
  )

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const currentTokens = useAuthStore.getState().tokens
      if (!currentTokens?.refreshToken) {
        return false
      }

      return false
    } catch (error) {
      console.error('Error al refrescar sesión:', error)
      return false
    }
  }, [])

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading: isLoading || isLoginLoading,
    error: error,
    user,
    login,
    logout: handleLogout,
    refreshSession,
    clearError,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

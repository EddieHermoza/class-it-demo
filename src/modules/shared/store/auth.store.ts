import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserProfileResponseDto } from '@/services/generated/classRoomApi.generated'

export type User = UserProfileResponseDto

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  user: User | null
  tokens: AuthTokens | null
}

export interface AuthActions {
  setCredentials: (data: { user: User; tokens: AuthTokens }) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  updateTokens: (tokens: Partial<AuthTokens>) => void
  logout: () => void
}

export type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
  tokens: null,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCredentials: (data) => {
        set({
          isAuthenticated: true,
          isLoading: false,
          error: null,
          user: data.user,
          tokens: data.tokens,
        })
      },
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),
      clearError: () => set({ error: null }),
      updateTokens: (newTokens) => {
        const currentTokens = get().tokens
        if (!currentTokens) return

        const updatedTokens = {
          ...currentTokens,
          ...newTokens,
        }
        set({
          tokens: updatedTokens,
        })
      },
      logout: () => {
        set(initialState)
        localStorage.removeItem('auth-storage')
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        tokens: state.tokens,
      }),
    }
  )
)

export const useAuthState = () =>
  useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    user: state.user,
  }))

export const authActions = {
  setCredentials: (data: Parameters<AuthStore['setCredentials']>[0]) =>
    useAuthStore.getState().setCredentials(data),
  setLoading: (loading: boolean) => useAuthStore.getState().setLoading(loading),
  setError: (error: string | null) => useAuthStore.getState().setError(error),
  clearError: () => useAuthStore.getState().clearError(),
  updateTokens: (tokens: Parameters<AuthStore['updateTokens']>[0]) =>
    useAuthStore.getState().updateTokens(tokens),
  logout: () => useAuthStore.getState().logout(),
}

export const useAuthActions = () => authActions

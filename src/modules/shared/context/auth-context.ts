'use client'
import { createContext } from 'react'
import type { User } from '../store/auth.store'

export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  user: User | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  refreshSession: () => Promise<boolean>
  clearError: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

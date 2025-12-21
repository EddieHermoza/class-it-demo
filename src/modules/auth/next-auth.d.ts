import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  export interface JWT {
    user: {
      id: string
      name: string
      lastName: string
      email: string
      avatarUrl: string
      role: string
      roleId: string
    }
    tokens: {
      access: string
      refresh: string
    }
  }
}

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string
      name: string
      lastName: string
      email: string
      avatarUrl: string
      role: string
      roleId: string
    }
    tokens: {
      access: string
      refresh: string
    }
  }
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  department?: string
  lastLogin?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

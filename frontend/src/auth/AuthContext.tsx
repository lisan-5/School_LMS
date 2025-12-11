import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'

type User = {
  id: number
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        const res = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(res.data)
      } catch (e) {
        setToken(null)
        localStorage.removeItem('token')
        delete api.defaults.headers.common.Authorization
      } finally {
        setLoading(false)
      }
    }
    bootstrap()
  }, [token])

  const handleAuth = (data: { token: string; user: User }) => {
    setToken(data.token)
    localStorage.setItem('token', data.token)
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`
    setUser(data.user)
  }

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })
    handleAuth(res.data)
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post('/auth/register', { name, email, password })
    handleAuth(res.data)
  }

  const logout = async () => {
    if (token) {
      await api.post(
        '/auth/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
    }
    setUser(null)
    setToken(null)
    delete api.defaults.headers.common.Authorization
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


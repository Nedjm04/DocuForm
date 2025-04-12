"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { api } from "@/lib/api"
import { routes } from "@/app/routes"

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")

      if (!token) {
        setIsLoading(false)
        // Rediriger vers la page de connexion si l'utilisateur n'est pas sur une page publique
        if (!isPublicRoute(pathname)) {
          router.push(routes.auth.login)
        }
        return
      }

      try {
        // Dans un environnement réel, vous feriez un appel API ici
        // const userData = await api.getCurrentUser()
        // setUser(userData)

        // Simulation pour la démo
        setUser({
          id: 1,
          name: "Admin",
          email: "admin@example.com",
          role: "admin",
        })
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
        localStorage.removeItem("auth_token")
        sessionStorage.removeItem("auth_token")
        if (!isPublicRoute(pathname)) {
          router.push(routes.auth.login)
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  const login = async (email: string, password: string, remember = false) => {
    setIsLoading(true)
    try {
      const response = await api.login({ email, password })

      if (remember) {
        localStorage.setItem("auth_token", response.token)
      } else {
        sessionStorage.setItem("auth_token", response.token)
      }

      setUser(response.user)
      router.push(routes.admin.dashboard)
    } catch (error) {
      console.error("Erreur de connexion:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await api.logout()
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      localStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_token")
      setUser(null)
      router.push(routes.auth.login)
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

// Liste des routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = [routes.auth.login, routes.auth.forgotPassword, routes.stagiaire.login]

function isPublicRoute(pathname: string) {
  return publicRoutes.includes(pathname) || pathname.startsWith("/stagiaire/")
}

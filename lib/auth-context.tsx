"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  preferences: {
    categories: string[]
    platforms: string[]
    priceRange: { min: number; max: number }
    currency: string
    location: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("shophoria_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data with Indian preferences
    const userData: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      preferences: {
        categories: ["Electronics", "Fashion", "Beauty"],
        platforms: ["flipkart", "amazon", "myntra"],
        priceRange: { min: 0, max: 100000 }, // In INR
        currency: "INR",
        location: "India",
      },
    }

    setUser(userData)
    localStorage.setItem("shophoria_user", JSON.stringify(userData))
    setLoading(false)
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const userData: User = {
      id: Date.now().toString(),
      email,
      name,
      preferences: {
        categories: [],
        platforms: [],
        priceRange: { min: 0, max: 50000 }, // Default range in INR
        currency: "INR",
        location: "India",
      },
    }

    setUser(userData)
    localStorage.setItem("shophoria_user", JSON.stringify(userData))
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("shophoria_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api, type Product, type Deal, type PriceAlert } from "./api"

interface RealtimeContextType {
  products: Product[]
  deals: Deal[]
  alerts: PriceAlert[]
  userStats: {
    totalSavings: number
    productsTracked: number
    activeAlerts: number
    platformsConnected: number
  }
  refreshData: () => Promise<void>
  loading: boolean
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [userStats, setUserStats] = useState({
    totalSavings: 0,
    productsTracked: 0,
    activeAlerts: 0,
    platformsConnected: 0,
  })
  const [loading, setLoading] = useState(true)

  const refreshData = async () => {
    try {
      const [dealsData, alertsData, statsData] = await Promise.all([
        api.getDeals(),
        api.getPriceAlerts(),
        api.getUserStats(),
      ])

      setDeals(dealsData)
      setAlerts(alertsData)
      setUserStats(statsData)
    } catch (error) {
      console.error("Error refreshing data:", error)
    }
  }

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true)
      await refreshData()
      setLoading(false)
    }

    initializeData()

    // Set up real-time updates
    const interval = setInterval(async () => {
      await api.updatePrices()
      await refreshData()
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <RealtimeContext.Provider
      value={{
        products,
        deals,
        alerts,
        userStats,
        refreshData,
        loading,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  )
}

export function useRealtime() {
  const context = useContext(RealtimeContext)
  if (context === undefined) {
    throw new Error("useRealtime must be used within a RealtimeProvider")
  }
  return context
}

"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { AuthProvider } from "@/lib/auth-context"
import { RealtimeProvider } from "@/lib/realtime-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RealtimeProvider>{children}</RealtimeProvider>
      </AuthProvider>
    </Provider>
  )
}

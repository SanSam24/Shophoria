"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Bell, User, LogOut, Search, Menu } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useAppSelector } from "@/lib/hooks"
import { AuthModal } from "./auth-modal"
import { Input } from "@/components/ui/input"

export function IntegratedHeader() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { user, logout } = useAuth()
  const alerts = useAppSelector((state) => state.alerts.alerts)

  const activeAlerts = alerts.filter((alert) => alert.isActive).length

  return (
    <>
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-lavender-gradient rounded-xl flex items-center justify-center shadow-lavender">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Shophoria
                </span>
                <span className="text-xs text-gray-500 -mt-1">Smart Shopping Platform</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products across platforms..."
                  className="pl-12 pr-4 py-3 w-full bg-white/80 border-lavender-200 focus:border-lavender-400 focus:ring-lavender-400"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-lavender-gradient hover:opacity-90"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/compare" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                Compare
              </Link>
              <Link href="/deals" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                Deals
              </Link>
              {user && (
                <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                  Dashboard
                </Link>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  {/* Notifications */}
                  <div className="relative">
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-5 h-5 text-gray-600" />
                      {activeAlerts > 0 && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
                          {activeAlerts}
                        </Badge>
                      )}
                    </Button>
                  </div>

                  {/* User Menu */}
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-lavender-50 border border-lavender-200">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="border-lavender-200 hover:bg-lavender-50 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    className="border-lavender-200 hover:bg-lavender-50"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-lavender-gradient hover:opacity-90 shadow-lavender"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Get Started
                  </Button>
                </>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full bg-white/80 border-lavender-200"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 py-4 border-t border-lavender-200">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/compare"
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Compare Products
                </Link>
                <Link
                  href="/deals"
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Hot Deals
                </Link>
                {user && (
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Dashboard
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}

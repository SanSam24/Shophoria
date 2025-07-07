"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Search, TrendingUp, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: ShoppingCart },
  { name: "Compare", href: "/compare", icon: Search },
  { name: "Deals", href: "/deals", icon: TrendingUp },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
      <div className="grid grid-cols-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 text-xs",
                isActive ? "text-purple-600 bg-purple-50" : "text-gray-600 hover:text-gray-900",
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

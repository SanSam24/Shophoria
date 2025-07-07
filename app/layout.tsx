import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shophoria - All-in-One E-Commerce Platform",
  description: "Compare prices, track deals, and shop smarter across multiple Indian platforms",
  keywords: "price comparison, deals, shopping, india, flipkart, amazon, myntra",
  authors: [{ name: "Shophoria Team" }],
  openGraph: {
    title: "Shophoria - Smart Shopping Platform",
    description: "Compare prices across Indian e-commerce platforms and save money",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

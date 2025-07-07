import { IntegratedHeader } from "@/components/integrated-header"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, TrendingUp, Bell, Users, Zap, Shield, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream-gradient">
      <IntegratedHeader />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-6 bg-lavender-100 text-purple-700 hover:bg-lavender-100 px-4 py-2 text-sm">
            🇮🇳 India's Premier E-Commerce Platform
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent leading-tight">
            Compare. Save. Shop Smarter.
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Compare prices across India's top e-commerce platforms - Flipkart, Amazon, Myntra, and more. Track deals,
            get price alerts, and save thousands on every purchase with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compare">
              <Button
                size="lg"
                className="bg-lavender-gradient hover:opacity-90 text-lg px-8 py-4 shadow-lavender hover-lift"
              >
                <Search className="w-5 h-5 mr-2" />
                Start Comparing
              </Button>
            </Link>
            <Link href="/deals">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-lavender-300 hover:bg-lavender-50 hover-lift bg-transparent"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View Deals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/60 backdrop-blur-sm py-16 border-y border-lavender-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Indian Platforms</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">50L+</div>
              <div className="text-gray-600 font-medium">Products Tracked</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">₹10Cr+</div>
              <div className="text-gray-600 font-medium">Total Savings</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Price Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Powerful Features for Smart Shopping</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to make intelligent purchasing decisions across India's top e-commerce platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lavender hover-lift bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-8">
              <div className="w-14 h-14 bg-lavender-100 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-3">Smart Search & Filters</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Advanced filtering across Flipkart, Amazon India, Myntra, Snapdeal, and more platforms with AI-powered
                search
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lavender hover-lift bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-8">
              <div className="w-14 h-14 bg-lavender-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-3">Real-time Price Tracking</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Live price monitoring in INR across all major Indian e-commerce platforms with instant updates and
                historical data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lavender hover-lift bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-8">
              <div className="w-14 h-14 bg-lavender-100 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-7 h-7 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-3">Festival Deal Alerts</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Get notified about Diwali, Big Billion Day, Great Indian Festival deals and price drops with smart
                notifications
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lavender hover-lift bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-8">
              <div className="w-14 h-14 bg-lavender-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-3">AI-Powered Recommendations</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Machine learning insights based on Indian shopping patterns and regional preferences for personalized
                suggestions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lavender hover-lift bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-8">
              <div className="w-14 h-14 bg-lavender-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-3">Live Stock Updates</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Real-time inventory tracking across platforms to ensure product availability with automated restocking
                alerts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lavender hover-lift bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-8">
              <div className="w-14 h-14 bg-lavender-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-3">Secure & Trusted</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Bank-level security compliant with Indian data protection laws and RBI guidelines with encrypted
                transactions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="bg-white/60 backdrop-blur-sm py-20 border-y border-lavender-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Integrated with India's Top Platforms</h2>
            <p className="text-xl text-gray-600">Real-time API connections with all major Indian e-commerce websites</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-center">
            {[
              { name: "Flipkart", color: "bg-blue-500" },
              { name: "Amazon", color: "bg-orange-500" },
              { name: "Myntra", color: "bg-pink-500" },
              { name: "Snapdeal", color: "bg-red-500" },
              { name: "Paytm Mall", color: "bg-blue-600" },
              { name: "Ajio", color: "bg-purple-500" },
              { name: "Nykaa", color: "bg-pink-600" },
              { name: "Meesho", color: "bg-green-500" },
            ].map((platform) => (
              <div key={platform.name} className="text-center group">
                <div
                  className={`w-16 h-16 ${platform.color} rounded-2xl shadow-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}
                >
                  <span className="text-white font-bold text-lg">{platform.name[0]}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{platform.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-lavender-gradient rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save money every day with Shophoria's intelligent price comparison
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compare">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-50"
              >
                <Search className="w-5 h-5 mr-2" />
                Start Comparing Now
              </Button>
            </Link>
            <Link href="/deals">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Star className="w-5 h-5 mr-2" />
                Browse Hot Deals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-lavender-gradient rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Shophoria</span>
                  <p className="text-xs text-gray-400">Smart Shopping Platform</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's ultimate e-commerce comparison platform for smart shoppers. Save money, time, and effort with
                our AI-powered insights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/compare" className="hover:text-white transition-colors">
                    Compare Products
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="hover:text-white transition-colors">
                    Track Deals
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Analytics Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">
                    API Integration
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Customer Care
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-white transition-colors">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-white transition-colors">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/gst" className="hover:text-white transition-colors">
                    GST Information
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Shophoria India. All rights reserved. | Made with ❤️ in India 🇮🇳</p>
            <p className="mt-2 text-sm">Powered by AI • Real-time APIs • Secure & Trusted</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

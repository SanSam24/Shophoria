"use client"

import { useState, useEffect } from "react"
import { IntegratedHeader } from "@/components/integrated-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, TrendingDown, Clock, FlameIcon as Fire, Star, ExternalLink, Loader2 } from "lucide-react"
import { api, type Deal, formatINR } from "@/lib/api"
import { useRealtime } from "@/lib/realtime-context"

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const { refreshData } = useRealtime()

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true)
      try {
        const dealsData = await api.getDeals()
        setDeals(dealsData)
      } catch (error) {
        console.error("Error loading deals:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDeals()
  }, [])

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      Flipkart: "bg-blue-500",
      Amazon: "bg-orange-500",
      Myntra: "bg-pink-500",
      Snapdeal: "bg-red-500",
      "Paytm Mall": "bg-blue-600",
      Ajio: "bg-purple-500",
      Nykaa: "bg-pink-600",
    }
    return colors[platform] || "bg-gray-500"
  }

  const filteredDeals = deals.filter((deal) => {
    switch (activeTab) {
      case "hot":
        return deal.isHot
      case "trending":
        return deal.isTrending
      case "ending":
        return new Date(deal.expiresAt).getTime() - Date.now() < 6 * 60 * 60 * 1000 // Less than 6 hours
      case "new":
        return true // For demo, showing all as new
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <IntegratedHeader />

      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">🔥 Hot Deals & Offers</h1>
              <p className="text-gray-600">Discover the best deals across Indian e-commerce platforms</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-600 to-green-600">
              <Bell className="w-4 h-4 mr-2" />
              Set Deal Alerts
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Deal Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Deals</TabsTrigger>
            <TabsTrigger value="hot">🔥 Hot Deals</TabsTrigger>
            <TabsTrigger value="trending">📈 Trending</TabsTrigger>
            <TabsTrigger value="ending">⏰ Ending Soon</TabsTrigger>
            <TabsTrigger value="new">✨ New Deals</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p>Loading deals...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {deal.isHot && (
                          <Badge className="bg-red-500 hover:bg-red-600 text-white">
                            <Fire className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                        {deal.isTrending && (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive" className="text-lg font-bold">
                          -{deal.discount}%
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{deal.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge className={`text-white ${getPlatformColor(deal.platform)}`}>{deal.platform}</Badge>
                          <Badge variant="outline">{deal.category}</Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{deal.rating}</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-600">{formatINR(deal.salePrice)}</span>
                            <span className="text-lg text-gray-500 line-through">{formatINR(deal.originalPrice)}</span>
                          </div>
                          <p className="text-sm text-green-600 font-medium">
                            Save {formatINR(deal.originalPrice - deal.salePrice)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-sm text-orange-600">
                          <Clock className="w-4 h-4" />
                          <span>Ends in {deal.timeLeft}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Deal
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-600 to-green-600">
                          Get Deal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hot">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow border-red-200">
                  <div className="relative">
                    <img src={deal.image || "/placeholder.svg"} alt={deal.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 hover:bg-red-600 text-white">
                        <Fire className="w-3 h-3 mr-1" />
                        Hot Deal
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive" className="text-lg font-bold">
                        -{deal.discount}%
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{deal.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-green-600">{formatINR(deal.salePrice)}</span>
                      <span className="text-lg text-gray-500 line-through">{formatINR(deal.originalPrice)}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600">
                      🔥 Grab This Hot Deal
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="text-center py-12">
              <TrendingDown className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trending Deals</h3>
              <p className="text-gray-600">Popular deals that everyone's talking about in India.</p>
            </div>
          </TabsContent>

          <TabsContent value="ending">
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ending Soon</h3>
              <p className="text-gray-600">Don't miss out on these limited-time offers!</p>
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">New Deals</h3>
              <p className="text-gray-600">Fresh deals added daily from Indian platforms.</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Festival Deals Section */}
        <Card className="mt-8 bg-gradient-to-r from-orange-50 to-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🎉 Festival Season Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Get ready for Diwali, Big Billion Day, Great Indian Festival, and more! Set up alerts for your favorite
              products and never miss a deal.
            </p>
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-orange-600 to-green-600">Set Festival Alerts</Button>
              <Button variant="outline">View All Festival Deals</Button>
            </div>
          </CardContent>
        </Card>

        {/* Deal Alert Setup */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Smart Deal Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Get notified when your favorite products go on sale during festivals, flash sales, or when new deals match
              your interests.
            </p>
            <Button className="bg-gradient-to-r from-orange-600 to-green-600">Set Up Smart Alerts</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

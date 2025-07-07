"use client"

import { useEffect } from "react"
import { IntegratedHeader } from "@/components/integrated-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, ShoppingCart, Bell, Star, DollarSign, Package, Users, Activity, Trash2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRealtime } from "@/lib/realtime-context"
import { api, formatINR } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useAuth()
  const { userStats, alerts, refreshData } = useRealtime()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
  }, [user, router])

  const deleteAlert = async (alertId: string) => {
    try {
      await api.deletePriceAlert(alertId)
      await refreshData()
      toast({
        title: "Alert Deleted",
        description: "Price alert has been removed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete alert.",
        variant: "destructive",
      })
    }
  }

  const getPlatformName = (platform: string) => {
    const platformNames: Record<string, string> = {
      flipkart: "Flipkart",
      amazon: "Amazon",
      myntra: "Myntra",
      snapdeal: "Snapdeal",
      paytm: "Paytm Mall",
      ajio: "Ajio",
      nykaa: "Nykaa",
    }
    return platformNames[platform] || platform
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <IntegratedHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Namaste, {user.name}! 🙏</h1>
          <p className="text-gray-600">Here's your personalized shopping insights across Indian platforms</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatINR(userStats.totalSavings)}</div>
              <p className="text-xs text-green-100">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Tracked</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.productsTracked}</div>
              <p className="text-xs text-muted-foreground">+5 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">{alerts.length} total alerts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Indian Platforms</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.platformsConnected}</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Price Drops */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Recent Price Drops
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "MacBook Air M2", oldPrice: 114900, newPrice: 99900, platform: "Flipkart", savings: 15000 },
                    { name: "Sony WH-1000XM4", oldPrice: 29990, newPrice: 19990, platform: "Amazon", savings: 10000 },
                    { name: 'iPad Pro 11"', oldPrice: 81900, newPrice: 71900, platform: "Amazon", savings: 10000 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="line-through text-gray-500">{formatINR(item.oldPrice)}</span>
                          <span className="text-green-600 font-bold">{formatINR(item.newPrice)}</span>
                          <Badge variant="outline">{item.platform}</Badge>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Save {formatINR(item.savings)}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => router.push("/compare")}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Compare Products
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => router.push("/deals")}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Browse Festival Deals
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    Manage Price Alerts
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Update Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Savings Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Savings Trend (INR)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive savings chart</p>
                    <p className="text-sm text-gray-500">Track your monthly savings across Indian platforms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  Your Price Alerts ({alerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {alerts.length > 0 ? (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium">{alert.productName}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Target: {formatINR(alert.targetPrice)}</span>
                            <span>Current: {formatINR(alert.currentPrice)}</span>
                            <Badge variant="outline">{getPlatformName(alert.platform)}</Badge>
                          </div>
                          <p className="text-xs text-gray-500">
                            Created: {new Date(alert.createdAt).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={alert.currentPrice <= alert.targetPrice ? "default" : "secondary"}>
                            {alert.currentPrice <= alert.targetPrice
                              ? "Target Reached!"
                              : `${formatINR(alert.currentPrice - alert.targetPrice)} to go`}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => deleteAlert(alert.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No price alerts yet</h3>
                    <p className="text-gray-600 mb-4">Start tracking products to get notified when prices drop.</p>
                    <Button
                      onClick={() => router.push("/compare")}
                      className="bg-gradient-to-r from-orange-600 to-green-600"
                    >
                      Browse Products
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Indian Market Insights</h3>
                  <p className="text-gray-600 mb-4">
                    We're analyzing your shopping patterns across Indian platforms to provide better recommendations.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Button variant="outline">Update Preferences</Button>
                    <Button className="bg-gradient-to-r from-orange-600 to-green-600">View Suggested Products</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                      <p className="text-gray-600">Shopping patterns analysis</p>
                      <p className="text-xs text-gray-500">Across Indian platforms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Package className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                      <p className="text-gray-600">Indian platform breakdown</p>
                      <p className="text-xs text-gray-500">Flipkart, Amazon, Myntra & more</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Savings Over Time (INR)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <DollarSign className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Comprehensive savings analytics in INR</p>
                      <p className="text-sm text-gray-500">Track your savings performance across Indian platforms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Festival Savings Card */}
              <Card className="lg:col-span-2 bg-gradient-to-r from-orange-50 to-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">🎉 Festival Season Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{formatINR(25000)}</div>
                      <p className="text-sm text-gray-600">Diwali Savings</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{formatINR(18000)}</div>
                      <p className="text-sm text-gray-600">Big Billion Day</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{formatINR(12000)}</div>
                      <p className="text-sm text-gray-600">Great Indian Festival</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

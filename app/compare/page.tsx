"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { IntegratedHeader } from "@/components/integrated-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Star,
  ShoppingCart,
  TrendingUp,
  ExternalLink,
  Bell,
  Loader2,
  Filter,
  SlidersHorizontal,
  Heart,
} from "lucide-react"
import { api, formatINR } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { productActions } from "@/lib/store"

export default function ComparePage() {
  const [showFilters, setShowFilters] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const dispatch = useAppDispatch()

  const { products, loading, error, searchQuery, filters } = useAppSelector((state) => state.products)

  const searchProducts = async () => {
    if (!searchQuery.trim()) return

    dispatch(productActions.setLoading(true))
    try {
      const results = await api.advancedSearch({
        query: searchQuery,
        platform: filters.platform,
        category: filters.category,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        minRating: filters.minRating,
        inStockOnly: filters.inStockOnly,
        sortBy: filters.sortBy,
      })
      dispatch(productActions.setProducts(results))
    } catch (error) {
      dispatch(productActions.setError("Failed to search products. Please try again."))
      toast({
        title: "Search Error",
        description: "Failed to search products. Please try again.",
        variant: "destructive",
      })
    }
  }

  const createPriceAlert = async (product: any) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to create price alerts.",
        variant: "destructive",
      })
      return
    }

    try {
      const targetPrice = Math.round(product.price * 0.9)
      await api.createPriceAlert(product.id, targetPrice, user.id)
      toast({
        title: "Price Alert Created",
        description: `You'll be notified when ${product.name} drops below ${formatINR(targetPrice)}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create price alert.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (searchQuery) {
      searchProducts()
    }
  }, [filters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchProducts()
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
      meesho: "Meesho",
    }
    return platformNames[platform] || platform
  }

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      flipkart: "bg-blue-500",
      amazon: "bg-orange-500",
      myntra: "bg-pink-500",
      snapdeal: "bg-red-500",
      paytm: "bg-blue-600",
      ajio: "bg-purple-500",
      nykaa: "bg-pink-600",
      meesho: "bg-green-500",
    }
    return colors[platform] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-cream-gradient">
      <IntegratedHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lavender p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Compare Products
              </h1>
              <p className="text-gray-600">Search and compare across India's top e-commerce platforms</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-lavender-200 hover:bg-lavender-50"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Main Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products (iPhone, Samsung, Nike shoes, Lakme foundation...)"
                value={searchQuery}
                onChange={(e) => dispatch(productActions.setSearchQuery(e.target.value))}
                className="pl-12 pr-4 py-4 text-lg bg-white/90 border-lavender-200 focus:border-lavender-400 focus:ring-lavender-400 rounded-xl"
              />
              <Button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-lavender-gradient hover:opacity-90"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <Select
                value={filters.sortBy}
                onValueChange={(value) => dispatch(productActions.updateFilters({ sortBy: value }))}
              >
                <SelectTrigger className="bg-white/90 border-lavender-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="discount">Best Discount</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.platform}
                onValueChange={(value) => dispatch(productActions.updateFilters({ platform: value }))}
              >
                <SelectTrigger className="bg-white/90 border-lavender-200">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="flipkart">Flipkart</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="myntra">Myntra</SelectItem>
                  <SelectItem value="snapdeal">Snapdeal</SelectItem>
                  <SelectItem value="paytm">Paytm Mall</SelectItem>
                  <SelectItem value="ajio">Ajio</SelectItem>
                  <SelectItem value="nykaa">Nykaa</SelectItem>
                  <SelectItem value="meesho">Meesho</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.category}
                onValueChange={(value) => dispatch(productActions.updateFilters({ category: value }))}
              >
                <SelectTrigger className="bg-white/90 border-lavender-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                  <SelectItem value="home">Home & Kitchen</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="sports">Sports & Fitness</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2 bg-white/90 border border-lavender-200 rounded-lg px-3 py-2">
                <Switch
                  checked={filters.inStockOnly}
                  onCheckedChange={(checked) => dispatch(productActions.updateFilters({ inStockOnly: checked }))}
                />
                <span className="text-sm font-medium">In Stock Only</span>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-lavender-50 rounded-xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range: {formatINR(filters.priceRange[0])} - {formatINR(filters.priceRange[1])}
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      dispatch(productActions.updateFilters({ priceRange: value as [number, number] }))
                    }
                    max={200000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Minimum Rating: {filters.minRating} stars
                  </label>
                  <Slider
                    value={[filters.minRating]}
                    onValueChange={(value) => dispatch(productActions.updateFilters({ minRating: value[0] }))}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-lg text-gray-600">Searching across Indian platforms...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-red-600 font-medium">{error}</p>
              <Button
                onClick={() => dispatch(productActions.setError(""))}
                className="mt-4 bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {products.length > 0 && !loading && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Search Results</h2>
                <p className="text-gray-600">Found {products.length} products across Indian e-commerce platforms</p>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {filters.platform !== "all" && `${getPlatformName(filters.platform)} • `}
                  {filters.category !== "all" && `${filters.category} • `}
                  {filters.inStockOnly && "In Stock Only"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid gap-8">
          {products.map((product) => (
            <Card
              key={`${product.platform}-${product.id}`}
              className="overflow-hidden hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-lavender"
            >
              <CardContent className="p-8">
                <div className="flex gap-8">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-40 h-40 object-cover rounded-xl"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold line-clamp-2 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`text-white ${getPlatformColor(product.platform)}`}>
                            {getPlatformName(product.platform)}
                          </Badge>
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge variant="outline">{product.brand}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews.toLocaleString("en-IN")} reviews)</span>
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-green-600">{formatINR(product.price)}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-xl text-gray-500 line-through">
                              {formatINR(product.originalPrice)}
                            </span>
                            <Badge variant="destructive" className="text-sm">
                              Save {formatINR(product.originalPrice - product.price)}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Sold by:</span> {product.seller}
                        </p>
                        <p>
                          <span className="font-medium">Shipping:</span> {product.shipping}
                        </p>
                        <p className="text-xs">Last updated: {new Date(product.lastUpdated).toLocaleTimeString()}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => createPriceAlert(product)}
                          className="border-lavender-200 hover:bg-lavender-50"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Price Alert
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-lavender-200 hover:bg-lavender-50 bg-transparent"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on {getPlatformName(product.platform)}
                        </Button>
                        <Button size="sm" disabled={!product.inStock} className="bg-lavender-gradient hover:opacity-90">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && searchQuery && !loading && !error && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto shadow-lavender">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
              <Button
                onClick={() => {
                  dispatch(productActions.setSearchQuery(""))
                  dispatch(productActions.clearProducts())
                }}
                className="bg-lavender-gradient hover:opacity-90"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Price History Chart Placeholder */}
        {products.length > 0 && (
          <Card className="mt-12 bg-white/80 backdrop-blur-sm border-0 shadow-lavender">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                Price History & Trends (INR)
              </h3>
              <div className="h-80 bg-gradient-to-r from-lavender-50 to-purple-50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-20 h-20 text-purple-400 mx-auto mb-6" />
                  <p className="text-xl font-medium text-gray-700 mb-2">Interactive Price History Chart</p>
                  <p className="text-gray-500">Track price changes across Indian platforms over time</p>
                  <Button className="mt-4 bg-lavender-gradient hover:opacity-90">View Detailed Analytics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

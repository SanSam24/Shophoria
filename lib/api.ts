// Comprehensive API service for Indian e-commerce platforms
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  platform: "flipkart" | "amazon" | "myntra" | "snapdeal" | "paytm" | "ajio" | "nykaa" | "meesho"
  category: string
  image: string
  images: string[]
  rating: number
  reviews: number
  inStock: boolean
  seller: string
  shipping: string
  specifications: Record<string, string>
  lastUpdated: string
  affiliate_url: string
  sku: string
  brand: string
}

export interface Deal {
  id: string
  productId: string
  title: string
  originalPrice: number
  salePrice: number
  discount: number
  platform: string
  category: string
  image: string
  timeLeft: string
  rating: number
  isHot: boolean
  isTrending: boolean
  expiresAt: string
  dealType: "flash" | "festival" | "clearance" | "bulk"
}

export interface PriceAlert {
  id: string
  productId: string
  productName: string
  targetPrice: number
  currentPrice: number
  platform: string
  isActive: boolean
  createdAt: string
  userId: string
  notificationSent: boolean
}

export interface PriceHistory {
  date: string
  price: number
  platform: string
}

export interface Recommendation {
  id: string
  productId: string
  reason: string
  confidence: number
  category: string
}

// Utility function to format Indian currency
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Platform configuration for real API integrations
const PLATFORM_CONFIGS = {
  flipkart: {
    baseUrl: "https://affiliate-api.flipkart.net/affiliate/api",
    apiKey: process.env.FLIPKART_API_KEY,
    trackingId: process.env.FLIPKART_TRACKING_ID,
  },
  amazon: {
    baseUrl: "https://webservices.amazon.in/paapi5",
    accessKey: process.env.AMAZON_ACCESS_KEY,
    secretKey: process.env.AMAZON_SECRET_KEY,
    partnerTag: process.env.AMAZON_PARTNER_TAG,
  },
  myntra: {
    baseUrl: "https://api.myntra.com/v1",
    apiKey: process.env.MYNTRA_API_KEY,
  },
  snapdeal: {
    baseUrl: "https://affiliate.snapdeal.com/api",
    apiKey: process.env.SNAPDEAL_API_KEY,
  },
}

// Simulate API delays for demo
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Enhanced mock database with comprehensive Indian products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Apple iPhone 15 Pro 128GB Natural Titanium",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system with Action Button",
    price: 134900,
    originalPrice: 139900,
    platform: "flipkart",
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    rating: 4.8,
    reviews: 2847,
    inStock: true,
    seller: "Apple Store",
    shipping: "Free delivery by tomorrow",
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Chip: "A17 Pro",
      Storage: "128GB",
      Camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      Battery: "Up to 23 hours video playback",
    },
    lastUpdated: new Date().toISOString(),
    affiliate_url: "https://flipkart.com/apple-iphone-15-pro",
    sku: "MOBGTAGPAQNVFZZY",
    brand: "Apple",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 256GB Titanium Black",
    description: "AI-powered smartphone with S Pen, 200MP camera, and Galaxy AI features",
    price: 124999,
    originalPrice: 129999,
    platform: "amazon",
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    rating: 4.5,
    reviews: 3421,
    inStock: true,
    seller: "Samsung India",
    shipping: "Free delivery",
    specifications: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      Storage: "256GB",
      Camera: "200MP + 50MP + 12MP + 10MP",
      Battery: "5000mAh with 45W fast charging",
    },
    lastUpdated: new Date().toISOString(),
    affiliate_url: "https://amazon.in/samsung-galaxy-s24-ultra",
    sku: "B0CMDRCZBZ",
    brand: "Samsung",
  },
  {
    id: "3",
    name: "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology and 30-hour battery life",
    price: 19990,
    originalPrice: 29990,
    platform: "amazon",
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    rating: 4.9,
    reviews: 5432,
    inStock: true,
    seller: "Sony India",
    shipping: "Free delivery",
    specifications: {
      Type: "Over-ear wireless",
      "Noise Canceling": "Industry-leading with Dual Noise Sensor",
      Battery: "30 hours with ANC",
      Connectivity: "Bluetooth 5.0, NFC",
      Features: "Touch controls, Quick Attention mode",
    },
    lastUpdated: new Date().toISOString(),
    affiliate_url: "https://amazon.in/sony-wh-1000xm4",
    sku: "WH1000XM4B",
    brand: "Sony",
  },
  {
    id: "4",
    name: "MacBook Air 13-inch M2 Chip 256GB Midnight",
    description: "Supercharged by M2 chip with 8-core CPU and 8-core GPU, up to 18 hours battery life",
    price: 99900,
    originalPrice: 114900,
    platform: "flipkart",
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    rating: 4.6,
    reviews: 892,
    inStock: false,
    seller: "Apple India",
    shipping: "Free delivery",
    specifications: {
      Chip: "Apple M2 with 8-core CPU",
      Memory: "8GB unified memory",
      Storage: "256GB SSD",
      Display: "13.6-inch Liquid Retina",
      Battery: "Up to 18 hours",
    },
    lastUpdated: new Date().toISOString(),
    affiliate_url: "https://flipkart.com/macbook-air-m2",
    sku: "MLY33HN/A",
    brand: "Apple",
  },
  {
    id: "5",
    name: "Nike Air Max 270 Running Shoes",
    description: "Comfortable running shoes with Air Max technology and breathable mesh upper",
    price: 7495,
    originalPrice: 9995,
    platform: "myntra",
    category: "Fashion",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    rating: 4.3,
    reviews: 1876,
    inStock: true,
    seller: "Nike India",
    shipping: "Free delivery above ₹799",
    specifications: {
      Type: "Running shoes",
      Material: "Mesh and synthetic",
      Sole: "Air Max cushioning",
      Closure: "Lace-up",
      Care: "Wipe with clean, dry cloth",
    },
    lastUpdated: new Date().toISOString(),
    affiliate_url: "https://myntra.com/nike-air-max-270",
    sku: "AH8050-100",
    brand: "Nike",
  },
  {
    id: "6",
    name: "Boat Airdopes 141 Bluetooth True Wireless Earbuds",
    description: "True wireless earbuds with 42H playtime, ENx technology, and BEAST mode for gaming",
    price: 1299,
    originalPrice: 2990,
    platform: "flipkart",
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    rating: 4.1,
    reviews: 12543,
    inStock: true,
    seller: "Boat Official Store",
    shipping: "Free delivery",
    specifications: {
      Type: "True wireless earbuds",
      Playtime: "42 hours total",
      Drivers: "8mm dynamic drivers",
      Connectivity: "Bluetooth v5.2",
      Features: "ENx technology, BEAST mode",
    },
    lastUpdated: new Date().toISOString(),
    affiliate_url: "https://flipkart.com/boat-airdopes-141",
    sku: "AD141",
    brand: "Boat",
  },
  {
    id: "7",
    name: "Lakme Absolute Perfect Radiance Skin Brightening Foundation",
    description: "Long-lasting foundation with SPF 20 and skin brightening formula for natural glow",
    price: 675,
    originalPrice: 750,
    platform: "nykaa",
    category: "Beauty",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    rating: 4.2,
    reviews: 2341,
    inStock: true,
    seller: "Nykaa",
    shipping: "Free delivery above ₹499",
    specifications: {
      Type: "Liquid foundation",
      Coverage: "Medium to full",
      Finish: "Natural radiant",
      SPF: "SPF 20",
      "Skin Type": "All skin types",
    },
    lastUpdated: new Date().toISOString(),
    affiliate_url: "https://nykaa.com/lakme-absolute-perfect-radiance",
    sku: "LAK001",
    brand: "Lakme",
  },
  {
    id: "8",
    name: "OnePlus 12R 256GB Cool Blue",
    description: "Flagship performance with Snapdragon 8 Gen 2, 100W SUPERVOOC charging, and Trinity Engine",
    price: 42999,
    originalPrice: 45999,
    platform: "amazon",
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    rating: 4.4,
    reviews: 1567,
    inStock: true,
    seller: "OnePlus Store",
    shipping: "Free delivery",
    specifications: {
      Display: "6.78-inch LTPO4 AMOLED",
      Processor: "Snapdragon 8 Gen 2",
      Storage: "256GB UFS 4.0",
      Camera: "50MP + 8MP + 2MP",
      Battery: "5400mAh with 100W charging",
    },
    lastUpdated: new Date().toISOString(),
    affiliate_url: "https://amazon.in/oneplus-12r",
    sku: "CPH2609",
    brand: "OnePlus",
  },
]

const mockDeals: Deal[] = [
  {
    id: "1",
    productId: "3",
    title: "Sony WH-1000XM4 Wireless Headphones",
    originalPrice: 29990,
    salePrice: 19990,
    discount: 33,
    platform: "Amazon",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    timeLeft: "2h 15m",
    rating: 4.8,
    isHot: true,
    isTrending: true,
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    dealType: "flash",
  },
  {
    id: "2",
    productId: "5",
    title: "Nike Air Max 270 Running Shoes",
    originalPrice: 9995,
    salePrice: 7495,
    discount: 25,
    platform: "Myntra",
    category: "Fashion",
    image: "/placeholder.svg?height=200&width=200",
    timeLeft: "1d 5h",
    rating: 4.3,
    isHot: false,
    isTrending: true,
    expiresAt: new Date(Date.now() + 29 * 60 * 60 * 1000).toISOString(),
    dealType: "festival",
  },
  {
    id: "3",
    productId: "6",
    title: "Boat Airdopes 141 Bluetooth Earbuds",
    originalPrice: 2990,
    salePrice: 1299,
    discount: 57,
    platform: "Flipkart",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    timeLeft: "3h 42m",
    rating: 4.1,
    isHot: true,
    isTrending: false,
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    dealType: "clearance",
  },
]

let mockAlerts: PriceAlert[] = []
const mockPriceHistory: PriceHistory[] = []

// Real API integration functions
class PlatformAPI {
  // Flipkart Affiliate API integration
  static async searchFlipkart(query: string): Promise<Product[]> {
    try {
      // Real Flipkart API call would go here
      const response = await fetch(`${PLATFORM_CONFIGS.flipkart.baseUrl}/search`, {
        method: "POST",
        headers: {
          "Fk-Affiliate-Id": PLATFORM_CONFIGS.flipkart.trackingId || "",
          "Fk-Affiliate-Token": PLATFORM_CONFIGS.flipkart.apiKey || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          resultCount: 20,
        }),
      })

      if (!response.ok) throw new Error("Flipkart API error")

      const data = await response.json()
      return this.transformFlipkartData(data.products || [])
    } catch (error) {
      console.error("Flipkart API error:", error)
      return mockProducts.filter((p) => p.platform === "flipkart")
    }
  }

  // Amazon Product Advertising API integration
  static async searchAmazon(query: string): Promise<Product[]> {
    try {
      // Real Amazon PAAPI 5.0 call would go here
      const response = await fetch(`${PLATFORM_CONFIGS.amazon.baseUrl}/searchitems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Amz-Target": "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems",
        },
        body: JSON.stringify({
          Keywords: query,
          SearchIndex: "All",
          PartnerTag: PLATFORM_CONFIGS.amazon.partnerTag,
          PartnerType: "Associates",
          Marketplace: "www.amazon.in",
        }),
      })

      if (!response.ok) throw new Error("Amazon API error")

      const data = await response.json()
      return this.transformAmazonData(data.SearchResult?.Items || [])
    } catch (error) {
      console.error("Amazon API error:", error)
      return mockProducts.filter((p) => p.platform === "amazon")
    }
  }

  // Transform platform-specific data to our unified format
  static transformFlipkartData(products: any[]): Product[] {
    return products.map((item: any) => ({
      id: item.productId,
      name: item.productBaseInfoV1?.title || "",
      description: item.productBaseInfoV1?.productDescription || "",
      price: item.productBaseInfoV1?.flipkartSellingPrice?.amount || 0,
      originalPrice: item.productBaseInfoV1?.flipkartSpecialPrice?.amount,
      platform: "flipkart" as const,
      category: item.productBaseInfoV1?.productFamily || "General",
      image: item.productBaseInfoV1?.imageUrls?.["400x400"] || "/placeholder.svg",
      images: Object.values(item.productBaseInfoV1?.imageUrls || {}),
      rating: item.productBaseInfoV1?.averageRating || 0,
      reviews: item.productBaseInfoV1?.totalRatingCount || 0,
      inStock: item.productBaseInfoV1?.inStock || false,
      seller: item.productBaseInfoV1?.brand || "Flipkart",
      shipping: "Free delivery",
      specifications: item.productBaseInfoV1?.keySpecs || {},
      lastUpdated: new Date().toISOString(),
      affiliate_url: item.productBaseInfoV1?.productUrl || "",
      sku: item.productId,
      brand: item.productBaseInfoV1?.brand || "",
    }))
  }

  static transformAmazonData(products: any[]): Product[] {
    return products.map((item: any) => ({
      id: item.ASIN,
      name: item.ItemInfo?.Title?.DisplayValue || "",
      description: item.ItemInfo?.Features?.DisplayValues?.join(", ") || "",
      price: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
      originalPrice: item.Offers?.Listings?.[0]?.SavingBasis?.Amount,
      platform: "amazon" as const,
      category: item.BrowseNodeInfo?.BrowseNodes?.[0]?.DisplayName || "General",
      image: item.Images?.Primary?.Large?.URL || "/placeholder.svg",
      images: item.Images?.Variants?.map((img: any) => img.Large.URL) || [],
      rating: item.CustomerReviews?.StarRating?.Value || 0,
      reviews: item.CustomerReviews?.Count || 0,
      inStock: item.Offers?.Listings?.[0]?.Availability?.Type === "Now",
      seller: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || "Amazon",
      shipping: "Free delivery",
      specifications: item.ItemInfo?.TechnicalInfo || {},
      lastUpdated: new Date().toISOString(),
      affiliate_url: item.DetailPageURL || "",
      sku: item.ASIN,
      brand: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || "",
    }))
  }
}

// Enhanced API functions with real integrations
export const api = {
  // Product operations with real API calls
  async searchProducts(
    query: string,
    filters?: { platform?: string; category?: string; sortBy?: string; priceRange?: [number, number] },
  ): Promise<Product[]> {
    await delay(800) // Simulate network delay

    let results: Product[] = []

    try {
      // Call real APIs based on platform filter
      if (!filters?.platform || filters.platform === "all") {
        // Search all platforms
        const [flipkartResults, amazonResults] = await Promise.allSettled([
          PlatformAPI.searchFlipkart(query),
          PlatformAPI.searchAmazon(query),
        ])

        if (flipkartResults.status === "fulfilled") results.push(...flipkartResults.value)
        if (amazonResults.status === "fulfilled") results.push(...amazonResults.value)

        // Add mock data for other platforms
        results.push(
          ...mockProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.description.toLowerCase().includes(query.toLowerCase()),
          ),
        )
      } else {
        // Search specific platform
        switch (filters.platform) {
          case "flipkart":
            results = await PlatformAPI.searchFlipkart(query)
            break
          case "amazon":
            results = await PlatformAPI.searchAmazon(query)
            break
          default:
            results = mockProducts.filter(
              (p) =>
                p.platform === filters.platform &&
                (p.name.toLowerCase().includes(query.toLowerCase()) ||
                  p.description.toLowerCase().includes(query.toLowerCase())),
            )
        }
      }
    } catch (error) {
      console.error("Search error:", error)
      // Fallback to mock data
      results = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply filters
    if (filters?.platform && filters.platform !== "all") {
      results = results.filter((product) => product.platform === filters.platform)
    }

    if (filters?.category && filters.category !== "all") {
      results = results.filter((product) => product.category.toLowerCase() === filters.category.toLowerCase())
    }

    if (filters?.priceRange) {
      const [min, max] = filters.priceRange
      results = results.filter((product) => product.price >= min && product.price <= max)
    }

    // Sort results
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case "price-low":
          results.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          results.sort((a, b) => b.price - a.price)
          break
        case "rating":
          results.sort((a, b) => b.rating - a.rating)
          break
        case "reviews":
          results.sort((a, b) => b.reviews - a.reviews)
          break
        case "discount":
          results.sort((a, b) => {
            const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0
            const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0
            return discountB - discountA
          })
          break
      }
    }

    return results
  },

  async getProduct(id: string): Promise<Product | null> {
    await delay(300)
    return mockProducts.find((product) => product.id === id) || null
  },

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    await delay(400)
    return mockProducts.filter((product) => ids.includes(product.id))
  },

  // Enhanced deal operations
  async getDeals(category?: string, dealType?: string): Promise<Deal[]> {
    await delay(600)
    let results = [...mockDeals]

    if (category && category !== "all") {
      results = results.filter((deal) => deal.category.toLowerCase() === category.toLowerCase())
    }

    if (dealType && dealType !== "all") {
      results = results.filter((deal) => deal.dealType === dealType)
    }

    return results
  },

  async getHotDeals(): Promise<Deal[]> {
    await delay(500)
    return mockDeals.filter((deal) => deal.isHot)
  },

  async getTrendingDeals(): Promise<Deal[]> {
    await delay(500)
    return mockDeals.filter((deal) => deal.isTrending)
  },

  // Price alert operations with notifications
  async createPriceAlert(productId: string, targetPrice: number, userId: string): Promise<PriceAlert> {
    await delay(400)
    const product = mockProducts.find((p) => p.id === productId)
    if (!product) throw new Error("Product not found")

    const alert: PriceAlert = {
      id: Date.now().toString(),
      productId,
      productName: product.name,
      targetPrice,
      currentPrice: product.price,
      platform: product.platform,
      isActive: true,
      createdAt: new Date().toISOString(),
      userId,
      notificationSent: false,
    }

    mockAlerts.push(alert)
    return alert
  },

  async getPriceAlerts(userId?: string): Promise<PriceAlert[]> {
    await delay(300)
    return userId ? mockAlerts.filter((alert) => alert.userId === userId) : [...mockAlerts]
  },

  async deletePriceAlert(id: string): Promise<void> {
    await delay(300)
    mockAlerts = mockAlerts.filter((alert) => alert.id !== id)
  },

  // Price history tracking
  async getPriceHistory(productId: string): Promise<PriceHistory[]> {
    await delay(400)
    // Generate mock price history
    const product = mockProducts.find((p) => p.id === productId)
    if (!product) return []

    const history: PriceHistory[] = []
    const currentDate = new Date()

    for (let i = 30; i >= 0; i--) {
      const date = new Date(currentDate)
      date.setDate(date.getDate() - i)

      const basePrice = product.price
      const variation = (Math.random() - 0.5) * 0.2 * basePrice // ±20% variation
      const price = Math.max(basePrice * 0.8, basePrice + variation)

      history.push({
        date: date.toISOString().split("T")[0],
        price: Math.round(price),
        platform: product.platform,
      })
    }

    return history
  },

  // AI-powered recommendations
  async getRecommendations(userId: string, category?: string): Promise<Recommendation[]> {
    await delay(500)

    const recommendations: Recommendation[] = [
      {
        id: "1",
        productId: "1",
        reason: "Based on your recent smartphone searches",
        confidence: 0.85,
        category: "Electronics",
      },
      {
        id: "2",
        productId: "3",
        reason: "Frequently bought with your recent purchases",
        confidence: 0.78,
        category: "Electronics",
      },
      {
        id: "3",
        productId: "5",
        reason: "Popular in your area",
        confidence: 0.72,
        category: "Fashion",
      },
    ]

    return category
      ? recommendations.filter((r) => r.category.toLowerCase() === category.toLowerCase())
      : recommendations
  },

  // Analytics and insights
  async getUserStats(userId: string): Promise<{
    totalSavings: number
    productsTracked: number
    activeAlerts: number
    platformsConnected: number
    avgSavingsPerMonth: number
    topCategory: string
    favoriteplatform: string
  }> {
    await delay(400)
    return {
      totalSavings: 45750,
      productsTracked: mockProducts.length,
      activeAlerts: mockAlerts.filter((alert) => alert.isActive && alert.userId === userId).length,
      platformsConnected: 8,
      avgSavingsPerMonth: 15250,
      topCategory: "Electronics",
      favoriteplatform: "Flipkart",
    }
  },

  // Real-time price updates with WebSocket simulation
  async updatePrices(): Promise<void> {
    await delay(200)
    mockProducts.forEach((product) => {
      if (Math.random() < 0.1) {
        // 10% chance of price change
        const change = (Math.random() - 0.5) * 1000 // ±₹500 change
        product.price = Math.max(100, Math.round(product.price + change))
        product.lastUpdated = new Date().toISOString()
      }
    })

    // Check price alerts
    mockAlerts.forEach((alert) => {
      const product = mockProducts.find((p) => p.id === alert.productId)
      if (product && product.price <= alert.targetPrice && !alert.notificationSent) {
        alert.notificationSent = true
        // Trigger notification (would integrate with push notification service)
        console.log(`Price alert triggered for ${alert.productName}`)
      }
    })
  },

  // Advanced search with filters
  async advancedSearch(params: {
    query: string
    category?: string
    platform?: string
    minPrice?: number
    maxPrice?: number
    minRating?: number
    brand?: string
    inStockOnly?: boolean
    sortBy?: string
  }): Promise<Product[]> {
    await delay(1000)

    const results = mockProducts.filter((product) => {
      const matchesQuery =
        product.name.toLowerCase().includes(params.query.toLowerCase()) ||
        product.description.toLowerCase().includes(params.query.toLowerCase())

      const matchesCategory =
        !params.category ||
        params.category === "all" ||
        product.category.toLowerCase() === params.category.toLowerCase()

      const matchesPlatform = !params.platform || params.platform === "all" || product.platform === params.platform

      const matchesPrice =
        (!params.minPrice || product.price >= params.minPrice) && (!params.maxPrice || product.price <= params.maxPrice)

      const matchesRating = !params.minRating || product.rating >= params.minRating

      const matchesBrand = !params.brand || product.brand.toLowerCase().includes(params.brand.toLowerCase())

      const matchesStock = !params.inStockOnly || product.inStock

      return (
        matchesQuery &&
        matchesCategory &&
        matchesPlatform &&
        matchesPrice &&
        matchesRating &&
        matchesBrand &&
        matchesStock
      )
    })

    // Apply sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case "price-low":
          results.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          results.sort((a, b) => b.price - a.price)
          break
        case "rating":
          results.sort((a, b) => b.rating - a.rating)
          break
        case "popularity":
          results.sort((a, b) => b.reviews - a.reviews)
          break
        case "newest":
          results.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
          break
      }
    }

    return results
  },

  // Bulk operations for admin/analytics
  async bulkUpdatePrices(updates: { productId: string; newPrice: number }[]): Promise<void> {
    await delay(500)
    updates.forEach((update) => {
      const product = mockProducts.find((p) => p.id === update.productId)
      if (product) {
        product.price = update.newPrice
        product.lastUpdated = new Date().toISOString()
      }
    })
  },

  // Platform health check
  async checkPlatformStatus(): Promise<Record<string, boolean>> {
    await delay(300)
    return {
      flipkart: true,
      amazon: true,
      myntra: true,
      snapdeal: false, // Simulate downtime
      paytm: true,
      ajio: true,
      nykaa: true,
      meesho: true,
    }
  },
}

import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product, Deal, PriceAlert, Recommendation } from "./api"

// Product slice
interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  searchQuery: string
  filters: {
    platform: string
    category: string
    sortBy: string
    priceRange: [number, number]
    minRating: number
    inStockOnly: boolean
  }
}

const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
  searchQuery: "",
  filters: {
    platform: "all",
    category: "all",
    sortBy: "relevance",
    priceRange: [0, 200000],
    minRating: 0,
    inStockOnly: false,
  },
}

const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    updateFilters: (state, action: PayloadAction<Partial<ProductState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearProducts: (state) => {
      state.products = []
      state.error = null
    },
  },
})

// Deals slice
interface DealsState {
  deals: Deal[]
  hotDeals: Deal[]
  trendingDeals: Deal[]
  loading: boolean
  error: string | null
}

const initialDealsState: DealsState = {
  deals: [],
  hotDeals: [],
  trendingDeals: [],
  loading: false,
  error: null,
}

const dealsSlice = createSlice({
  name: "deals",
  initialState: initialDealsState,
  reducers: {
    setDeals: (state, action: PayloadAction<Deal[]>) => {
      state.deals = action.payload
      state.loading = false
      state.error = null
    },
    setHotDeals: (state, action: PayloadAction<Deal[]>) => {
      state.hotDeals = action.payload
    },
    setTrendingDeals: (state, action: PayloadAction<Deal[]>) => {
      state.trendingDeals = action.payload
    },
    setDealsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setDealsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

// Alerts slice
interface AlertsState {
  alerts: PriceAlert[]
  loading: boolean
  error: string | null
}

const initialAlertsState: AlertsState = {
  alerts: [],
  loading: false,
  error: null,
}

const alertsSlice = createSlice({
  name: "alerts",
  initialState: initialAlertsState,
  reducers: {
    setAlerts: (state, action: PayloadAction<PriceAlert[]>) => {
      state.alerts = action.payload
      state.loading = false
      state.error = null
    },
    addAlert: (state, action: PayloadAction<PriceAlert>) => {
      state.alerts.push(action.payload)
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload)
    },
    setAlertsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setAlertsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

// User slice
interface UserState {
  user: {
    id: string
    email: string
    name: string
    preferences: {
      categories: string[]
      platforms: string[]
      priceRange: { min: number; max: number }
      currency: string
      location: string
      notifications: boolean
    }
  } | null
  loading: boolean
  error: string | null
  stats: {
    totalSavings: number
    productsTracked: number
    activeAlerts: number
    platformsConnected: number
    avgSavingsPerMonth: number
    topCategory: string
    favoriteplatform: string
  } | null
}

const initialUserState: UserState = {
  user: null,
  loading: false,
  error: null,
  stats: null,
}

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    setUserStats: (state, action: PayloadAction<UserState["stats"]>) => {
      state.stats = action.payload
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    updateUserPreferences: (state, action: PayloadAction<Partial<UserState["user"]["preferences"]>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload }
      }
    },
    logout: (state) => {
      state.user = null
      state.stats = null
      state.error = null
    },
  },
})

// Recommendations slice
interface RecommendationsState {
  recommendations: Recommendation[]
  loading: boolean
  error: string | null
}

const initialRecommendationsState: RecommendationsState = {
  recommendations: [],
  loading: false,
  error: null,
}

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: initialRecommendationsState,
  reducers: {
    setRecommendations: (state, action: PayloadAction<Recommendation[]>) => {
      state.recommendations = action.payload
      state.loading = false
      state.error = null
    },
    setRecommendationsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setRecommendationsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

// Configure store
export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    deals: dealsSlice.reducer,
    alerts: alertsSlice.reducer,
    user: userSlice.reducer,
    recommendations: recommendationsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export actions
export const productActions = productSlice.actions
export const dealsActions = dealsSlice.actions
export const alertsActions = alertsSlice.actions
export const userActions = userSlice.actions
export const recommendationsActions = recommendationsSlice.actions

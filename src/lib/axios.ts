import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    retried?: boolean
    sentToken?: string
  }
}

export interface SessionHandlers {
  getAccessToken: () => string | null
  getRefreshToken: () => string | null
  refreshAccessToken: () => Promise<string | null>
  onUnauthorized: () => void
}

const PUBLIC_PATHS = ['/legal_persons', '/auth/login', '/auth/refresh']
const NO_REFRESH_PATHS = ['/auth/login', '/auth/refresh']
const REFRESH_REJECTED_STATUSES = [400, 401]
const LOGOUT_PATH = '/auth/logout'

let handlers: SessionHandlers | null = null
let refreshing: Promise<string | null> | null = null

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'pt-BR',
  },
})

const refreshOnce = (current: SessionHandlers): Promise<string | null> => {
  refreshing ??= current.refreshAccessToken().finally(() => {
    refreshing = null
  })
  return refreshing
}

const isRefreshRejected = (error: unknown): boolean =>
  axios.isAxiosError(error) && REFRESH_REJECTED_STATUSES.includes(error.response?.status ?? 0)

const toRetry = (
  config: InternalAxiosRequestConfig,
  current: SessionHandlers,
): InternalAxiosRequestConfig => {
  if (config.url !== LOGOUT_PATH) return { ...config, retried: true }
  return { ...config, retried: true, data: JSON.stringify({ refresh_token: current.getRefreshToken() }) }
}

api.interceptors.request.use((config) => {
  const token = handlers?.getAccessToken()
  if (token && !PUBLIC_PATHS.includes(config.url ?? '')) {
    config.headers.set('Authorization', `Bearer ${token}`)
    config.sentToken = token
  }
  return config
})

api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const current = handlers
  const config = error.config
  if (
    !current ||
    !config ||
    error.response?.status !== 401 ||
    config.retried ||
    NO_REFRESH_PATHS.includes(config.url ?? '')
  ) {
    throw error
  }

  const currentToken = current.getAccessToken()
  if (currentToken && currentToken !== config.sentToken) {
    return await api.request(toRetry(config, current))
  }

  let token: string | null
  try {
    token = await refreshOnce(current)
  } catch (refreshError) {
    if (isRefreshRejected(refreshError)) current.onUnauthorized()
    throw error
  }
  if (!token) throw error
  return await api.request(toRetry(config, current))
})

export const registerSessionHandlers = (value: SessionHandlers) => {
  handlers = value
}

export default api

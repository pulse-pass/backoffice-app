import { makeAutoObservable } from 'mobx'

import type {
  AccessTokenPayload,
  SessionClaims,
  SessionResponse,
  SessionRole,
  StoredSession,
} from '@/services/session/session.types'
import { decodeJwtPayload } from '@/utils/jwt.handlers'

const STORAGE_KEY = 'pulsepass.backoffice.session'

const AREA_PATHS: Record<SessionRole, string> = {
  organizer: '/eventos',
  admin: '/organizadores',
}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const isOptionalString = (value: unknown): boolean => value === undefined || typeof value === 'string'

const isAccessTokenPayload = (value: unknown): value is AccessTokenPayload => {
  if (typeof value !== 'object' || value === null) return false
  if (!('person_key' in value) || typeof value.person_key !== 'string') return false
  if (!('exp' in value) || typeof value.exp !== 'number') return false
  if (!('realm_access' in value) || typeof value.realm_access !== 'object' || value.realm_access === null) {
    return false
  }
  if (!('roles' in value.realm_access) || !isStringArray(value.realm_access.roles)) return false
  if ('legal_person_key' in value && !isOptionalString(value.legal_person_key)) return false
  return !('name' in value) || isOptionalString(value.name)
}

const isStoredSession = (value: unknown): value is StoredSession =>
  typeof value === 'object' &&
  value !== null &&
  'access_token' in value &&
  typeof value.access_token === 'string' &&
  'refresh_token' in value &&
  typeof value.refresh_token === 'string'

const readStorage = (): StoredSession | null => {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    return isStoredSession(stored) ? stored : null
  } catch {
    return null
  }
}

const writeStorage = (session: StoredSession | null) => {
  try {
    if (session) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}

class SessionStore {
  accessToken: string | null = null
  refreshToken: string | null = null
  isHydrated = false

  constructor() {
    makeAutoObservable(this)
  }

  get claims(): SessionClaims | null {
    if (!this.accessToken) return null
    const payload = decodeJwtPayload(this.accessToken)
    if (!isAccessTokenPayload(payload)) return null
    return {
      person_key: payload.person_key,
      legal_person_key: payload.legal_person_key,
      name: payload.name,
      roles: payload.realm_access.roles,
      exp: payload.exp,
    }
  }

  get role(): SessionRole | null {
    if (this.claims?.roles.includes('admin')) return 'admin'
    if (this.claims?.roles.includes('organizer')) return 'organizer'
    return null
  }

  get areaPath(): string {
    return this.role ? AREA_PATHS[this.role] : '/login'
  }

  hydrate() {
    const stored = readStorage()
    this.accessToken = stored?.access_token ?? null
    this.refreshToken = stored?.refresh_token ?? null
    this.isHydrated = true
  }

  setSession(response: SessionResponse) {
    this.accessToken = response.access_token
    this.refreshToken = response.refresh_token
    writeStorage({ access_token: response.access_token, refresh_token: response.refresh_token })
  }

  clear() {
    this.accessToken = null
    this.refreshToken = null
    writeStorage(null)
  }
}

export const sessionStore = new SessionStore()

import { makeAutoObservable } from 'mobx'

import { sessionApi } from '@/services/session/session.api'
import type { SessionProfile, SessionRole } from '@/services/session/session.types'

const AREA_PATHS: Record<SessionRole, string> = {
  organizer: '/eventos',
  admin: '/organizadores',
}

class SessionStore {
  profile: SessionProfile | null = null
  isHydrated = false
  private isHydrating = false

  constructor() {
    makeAutoObservable(this)
  }

  get role(): SessionRole | null {
    if (this.profile?.roles.includes('admin')) return 'admin'
    if (this.profile?.roles.includes('organizer')) return 'organizer'
    return null
  }

  get areaPath(): string {
    return this.role ? AREA_PATHS[this.role] : '/login'
  }

  setProfile(profile: SessionProfile) {
    this.profile = profile
  }

  clear() {
    this.profile = null
  }

  async hydrate() {
    if (this.isHydrated || this.isHydrating) return
    this.isHydrating = true
    let profile: SessionProfile | null = null
    try {
      profile = await sessionApi.getSession()
    } catch {
      profile = null
    }
    this.profile = profile
    this.isHydrated = true
    this.isHydrating = false
  }
}

export const sessionStore = new SessionStore()

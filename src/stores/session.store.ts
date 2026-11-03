import { makeAutoObservable } from 'mobx'

import { sessionApi } from '@/services/session/session.api'
import type { GetSessionResponse, SessionRole } from '@/services/session/session.types'
import { organizationStore } from '@/stores/organization.store'

class SessionStore {
  profile: GetSessionResponse | null = null
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
    if (this.role === 'admin') return '/organizadores'
    if (this.role === 'organizer')
      return organizationStore.organization?.organization_status === 'APPROVED' ? '/eventos' : '/situacao'
    return '/login'
  }

  setProfile(profile: GetSessionResponse) {
    this.profile = profile
  }

  clear() {
    this.profile = null
    organizationStore.clear()
  }

  async logout() {
    await sessionApi.deleteSession().catch(() => undefined)
    this.clear()
  }

  async hydrate() {
    if (this.isHydrated || this.isHydrating) return
    this.isHydrating = true
    let profile: GetSessionResponse | null = null
    try {
      profile = await sessionApi.getSession()
    } catch {
      profile = null
    }
    this.profile = profile
    if (this.role === 'organizer') await organizationStore.fetchOrganization().catch(() => undefined)
    this.isHydrated = true
    this.isHydrating = false
  }
}

export const sessionStore = new SessionStore()

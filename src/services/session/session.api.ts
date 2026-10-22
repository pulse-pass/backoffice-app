import { BaseApi } from '../api/base.api'
import type { CreateSessionRequest, SessionProfile } from './session.types'

export class SessionApi extends BaseApi {
  async createSession(data: CreateSessionRequest): Promise<void> {
    await this.post<void>('/auth/login', data)
  }

  async refreshSession(): Promise<void> {
    await this.post<void>('/auth/refresh', undefined)
  }

  async deleteSession(): Promise<void> {
    await this.post<void>('/auth/logout', undefined)
  }

  async getSession(): Promise<SessionProfile> {
    return await this.get<SessionProfile>('/auth/me')
  }
}

export const sessionApi = new SessionApi()

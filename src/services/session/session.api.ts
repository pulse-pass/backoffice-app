import { BaseApi } from '../api/base.api'
import type {
  CreateSessionRequest,
  DeleteSessionRequest,
  RefreshSessionRequest,
  SessionResponse,
} from './session.types'

export class SessionApi extends BaseApi {
  async createSession(data: CreateSessionRequest): Promise<SessionResponse> {
    return await this.post<SessionResponse>('/auth/login', data)
  }

  async refreshSession(data: RefreshSessionRequest): Promise<SessionResponse> {
    return await this.post<SessionResponse>('/auth/refresh', data)
  }

  async deleteSession(data: DeleteSessionRequest): Promise<void> {
    await this.post<void>('/auth/logout', data)
  }
}

export const sessionApi = new SessionApi()

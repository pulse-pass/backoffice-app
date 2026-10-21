export type SessionRole = 'organizer' | 'admin'

export interface CreateSessionRequest {
  document_number: string
  password: string
}

export interface SessionResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_expires_in: number
  token_type: string
}

export interface RefreshSessionRequest {
  refresh_token: string
}

export interface DeleteSessionRequest {
  refresh_token: string
}

export interface AccessTokenPayload {
  person_key: string
  legal_person_key?: string
  name?: string
  realm_access: { roles: string[] }
  exp: number
}

export interface SessionClaims {
  person_key: string
  legal_person_key?: string
  name?: string
  roles: string[]
  exp: number
}

export interface StoredSession {
  access_token: string
  refresh_token: string
}

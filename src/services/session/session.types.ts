export type SessionRole = 'organizer' | 'admin'

export interface CreateSessionRequest {
  document_number: string
  password: string
}

export interface SessionLegalPerson {
  legal_person_key: string
  name: string
}

export interface SessionProfile {
  person_key: string
  name: string
  document_number: string
  roles: string[]
  legal_person: SessionLegalPerson | null
}

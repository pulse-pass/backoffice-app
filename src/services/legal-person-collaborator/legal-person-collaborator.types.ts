export type LegalPersonCollaboratorRole = 'OWNER' | 'MEMBER'

export type LegalPersonCollaboratorStatus = 'ACTIVE' | 'DELETED'

export interface ListLegalPersonCollaboratorsParams {
  collaborator_role?: LegalPersonCollaboratorRole
}

export interface ListInternalLegalPersonCollaboratorsParams {
  collaborator_role?: LegalPersonCollaboratorRole
}

export interface LegalPersonCollaboratorPersonResponse {
  person_key: string
  name: string
  document_number: string
}

export interface LegalPersonCollaboratorNaturalPersonResponse {
  email: string
  person: LegalPersonCollaboratorPersonResponse
}

export interface ListLegalPersonCollaboratorsResponse {
  legal_person_collaborator_key: string
  collaborator_role: LegalPersonCollaboratorRole
  legal_person_collaborator_status: LegalPersonCollaboratorStatus
  natural_person: LegalPersonCollaboratorNaturalPersonResponse
}

export interface ListInternalLegalPersonCollaboratorsResponse {
  legal_person_collaborator_key: string
  collaborator_role: LegalPersonCollaboratorRole
  legal_person_collaborator_status: LegalPersonCollaboratorStatus
  natural_person: LegalPersonCollaboratorNaturalPersonResponse
}

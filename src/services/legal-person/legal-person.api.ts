import { BaseApi } from '../api/base.api'
import type {
  CreateLegalPersonRequest,
  CreateLegalPersonResponse,
  GetInternalLegalPersonResponse,
  GetLegalPersonResponse,
} from './legal-person.types'

export class LegalPersonApi extends BaseApi {
  async createLegalPerson(data: CreateLegalPersonRequest): Promise<CreateLegalPersonResponse> {
    return await this.post<CreateLegalPersonResponse>('/legal_persons', data)
  }

  async getLegalPerson(legalPersonKey: string): Promise<GetLegalPersonResponse> {
    return await this.get<GetLegalPersonResponse>(`/legal_persons/${legalPersonKey}`)
  }

  async getInternalLegalPerson(legalPersonKey: string): Promise<GetInternalLegalPersonResponse> {
    return await this.get<GetInternalLegalPersonResponse>(`/internal/legal_persons/${legalPersonKey}`)
  }
}

export const legalPersonApi = new LegalPersonApi()

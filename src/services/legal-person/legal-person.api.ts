import { BaseApi } from '../api/base.api'
import type { CreateLegalPersonRequest, CreateLegalPersonResponse } from './legal-person.types'

export class LegalPersonApi extends BaseApi {
  async createLegalPerson(data: CreateLegalPersonRequest): Promise<CreateLegalPersonResponse> {
    return await this.post<CreateLegalPersonResponse>('/legal_persons', data)
  }
}

export const legalPersonApi = new LegalPersonApi()

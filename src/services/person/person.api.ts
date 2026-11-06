import { BaseApi } from '@/services/api/base.api'

import type { GetInternalPersonResponse, GetPersonResponse } from './person.types'

export class PersonApi extends BaseApi {
  async getPerson(personKey: string): Promise<GetPersonResponse> {
    return await this.get<GetPersonResponse>(`/persons/${personKey}`)
  }

  async getInternalPerson(personKey: string): Promise<GetInternalPersonResponse> {
    return await this.get<GetInternalPersonResponse>(`/internal/persons/${personKey}`)
  }
}

export const personApi = new PersonApi()

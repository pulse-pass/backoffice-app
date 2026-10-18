import { makeAutoObservable } from 'mobx'

import type { CreateLegalPersonResponse } from '@/services/legal-person/legal-person.types'

class LegalPersonStore {
  legalPerson: CreateLegalPersonResponse | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setLegalPerson(legalPerson: CreateLegalPersonResponse) {
    this.legalPerson = legalPerson
  }
}

export const legalPersonStore = new LegalPersonStore()

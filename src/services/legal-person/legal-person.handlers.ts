import type { LegalPersonCompanyType } from './legal-person.types'

export const COMPANY_TYPES: Array<{ value: LegalPersonCompanyType; label: string }> = [
  { value: 'MEI', label: 'Microempreendedor individual' },
  { value: 'LIMITED', label: 'Sociedade limitada' },
  { value: 'INDIVIDUAL', label: 'Empresário individual' },
  { value: 'ASSOCIATION', label: 'Associação' },
]

export const getCompanyTypeLabel = (value: LegalPersonCompanyType): string =>
  COMPANY_TYPES.find((type) => type.value === value)?.label ?? value

export const isCompanyType = (value: string): value is LegalPersonCompanyType =>
  COMPANY_TYPES.some((type) => type.value === value)

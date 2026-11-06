import { onlyDigits } from './document.handlers'

export interface ParsedPhone {
  area_code: string
  number: string
}

const MAX_PHONE_LENGTH = 11
const MOBILE_PREFIX_LENGTH = 5
const MOBILE_NUMBER_LENGTH = 9
const COUNTRY_CODE_PREFIX = '+55'

const getNationalDigits = (value: string): string => {
  const trimmed = value.trim()
  const national = trimmed.startsWith(COUNTRY_CODE_PREFIX)
    ? trimmed.slice(COUNTRY_CODE_PREFIX.length)
    : trimmed
  return onlyDigits(national).slice(0, MAX_PHONE_LENGTH)
}

export const formatPhone = (value: string): string => {
  const digits = getNationalDigits(value)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  const area = digits.slice(0, 2)
  const rest = digits.slice(2)
  if (rest.length <= MOBILE_PREFIX_LENGTH) return `(${area}) ${rest}`
  return `(${area}) ${rest.slice(0, MOBILE_PREFIX_LENGTH)}-${rest.slice(MOBILE_PREFIX_LENGTH)}`
}

export const parsePhone = (value: string): ParsedPhone => {
  const digits = getNationalDigits(value)
  return { area_code: digits.slice(0, 2), number: digits.slice(2) }
}

export const validatePhone = (value: string): boolean => {
  const { area_code, number } = parsePhone(value)
  if (area_code.length !== 2 || area_code.startsWith('0')) return false
  return number.length === MOBILE_NUMBER_LENGTH && number.startsWith('9')
}

import { onlyDigits } from './document.handlers'

export interface ParsedPhone {
  area_code: string
  number: string
}

const MAX_PHONE_LENGTH = 11
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
  const split = digits.length > 10 ? 5 : 4
  if (rest.length <= split) return `(${area}) ${rest}`
  return `(${area}) ${rest.slice(0, split)}-${rest.slice(split)}`
}

export const parsePhone = (value: string): ParsedPhone => {
  const digits = getNationalDigits(value)
  return { area_code: digits.slice(0, 2), number: digits.slice(2) }
}

export const validatePhone = (value: string): boolean => {
  const { area_code, number } = parsePhone(value)
  if (area_code.length !== 2 || area_code.startsWith('0')) return false
  if (number.length === 9) return number.startsWith('9')
  return number.length === 8 && /^[2-5]/.test(number)
}

import { onlyDigits } from './document.handlers'

const POSTAL_CODE_LENGTH = 8

export const validatePostalCode = (postalCode: string): boolean =>
  onlyDigits(postalCode).length === POSTAL_CODE_LENGTH

export const formatPostalCode = (value: string): string => {
  const digits = onlyDigits(value).slice(0, POSTAL_CODE_LENGTH)
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`
  return digits
}

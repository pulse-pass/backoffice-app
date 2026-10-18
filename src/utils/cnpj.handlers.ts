import { hasRepeatedDigits, onlyDigits } from './document.handlers'

const CNPJ_LENGTH = 14

const calculateDigit = (digits: string, length: number): number => {
  let weight = length - 7
  let sum = 0
  for (let i = 0; i < length; i++) {
    sum += Number(digits.charAt(i)) * weight
    weight = weight === 2 ? 9 : weight - 1
  }
  const remainder = sum % 11
  return remainder < 2 ? 0 : 11 - remainder
}

export const validateCNPJ = (cnpj: string): boolean => {
  const digits = onlyDigits(cnpj)
  if (digits.length !== CNPJ_LENGTH) return false
  if (hasRepeatedDigits(digits)) return false
  if (calculateDigit(digits, 12) !== Number(digits.charAt(12))) return false
  return calculateDigit(digits, 13) === Number(digits.charAt(13))
}

export const formatCNPJ = (value: string): string => {
  const digits = onlyDigits(value).slice(0, CNPJ_LENGTH)
  let formatted = digits.slice(0, 2)
  if (digits.length > 2) formatted += `.${digits.slice(2, 5)}`
  if (digits.length > 5) formatted += `.${digits.slice(5, 8)}`
  if (digits.length > 8) formatted += `/${digits.slice(8, 12)}`
  if (digits.length > 12) formatted += `-${digits.slice(12)}`
  return formatted
}

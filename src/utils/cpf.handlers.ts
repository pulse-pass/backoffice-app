import { hasRepeatedDigits, onlyDigits } from './document.handlers'

const CPF_LENGTH = 11

const calculateDigit = (digits: string, length: number): number => {
  let sum = 0
  for (let i = 0; i < length; i++) {
    sum += Number(digits.charAt(i)) * (length + 1 - i)
  }
  const digit = 11 - (sum % 11)
  return digit >= 10 ? 0 : digit
}

export const validateCPF = (cpf: string): boolean => {
  const digits = onlyDigits(cpf)
  if (digits.length !== CPF_LENGTH) return false
  if (hasRepeatedDigits(digits)) return false
  if (calculateDigit(digits, 9) !== Number(digits.charAt(9))) return false
  return calculateDigit(digits, 10) === Number(digits.charAt(10))
}

export const formatCPF = (value: string): string => {
  const digits = onlyDigits(value).slice(0, CPF_LENGTH)
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9)]
  let formatted = parts.filter(Boolean).join('.')
  if (digits.length > 9) formatted += `-${digits.slice(9)}`
  return formatted
}

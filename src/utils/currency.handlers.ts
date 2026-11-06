import { onlyDigits } from './document.handlers'

const DECIMAL_DIGITS = 2
const MASK_PREFIX = 'R$'
const MAX_INTEGER_DIGITS = 10

const INTEGER_FORMAT = new Intl.NumberFormat('pt-BR')
const NUMBER_FORMAT = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: DECIMAL_DIGITS,
  maximumFractionDigits: DECIMAL_DIGITS,
})

const getDecimalSeparatorIndex = (value: string): number => {
  const commaIndex = value.lastIndexOf(',')
  if (commaIndex >= 0) return commaIndex
  const hasPastedDecimals = !value.startsWith(MASK_PREFIX) && /\.\d{1,2}$/.test(value)
  return hasPastedDecimals ? value.lastIndexOf('.') : -1
}

const splitAmount = (value: string) => {
  const separatorIndex = getDecimalSeparatorIndex(value)
  const hasSeparator = separatorIndex >= 0
  const integer = onlyDigits(hasSeparator ? value.slice(0, separatorIndex) : value)
    .replace(/^0+(?=\d)/, '')
    .slice(0, MAX_INTEGER_DIGITS)
  const decimals = hasSeparator ? onlyDigits(value.slice(separatorIndex + 1)).slice(0, DECIMAL_DIGITS) : ''
  return { integer, decimals, hasSeparator }
}

export const formatCurrency = (amount: number): string => `${MASK_PREFIX} ${NUMBER_FORMAT.format(amount)}`

export const parseCurrency = (value: string): number => {
  const { integer, decimals } = splitAmount(value)
  return Number(`${integer || '0'}.${decimals.padEnd(DECIMAL_DIGITS, '0')}`)
}

export const formatCurrencyInput = (value: string): string => {
  const { integer, decimals, hasSeparator } = splitAmount(value)
  if (!integer && !hasSeparator) return ''
  const formattedInteger = INTEGER_FORMAT.format(Number(integer || '0'))
  return `${MASK_PREFIX} ${formattedInteger}${hasSeparator ? `,${decimals}` : ''}`
}

export const completeCurrencyInput = (value: string): string =>
  value ? formatCurrency(parseCurrency(value)) : value

export const validateCurrency = (value: string): boolean => parseCurrency(value) > 0

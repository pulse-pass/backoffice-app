export const onlyDigits = (value: string): string => value.replace(/\D/g, '')

export const hasRepeatedDigits = (digits: string): boolean => /^(\d)\1+$/.test(digits)

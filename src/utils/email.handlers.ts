const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/
const MAX_EMAIL_LENGTH = 255

export const validateEmail = (email: string): boolean => {
  const value = email.trim()
  return value.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(value)
}

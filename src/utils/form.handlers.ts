export type FieldRule = (value: string) => string | undefined

export type FieldErrors<TKey extends string> = Partial<Record<TKey, string>>

export type Form<TData, TKey extends string, TSection extends string, TRequest> = {
  fields: TKey[]
  initialData: TData
  update: (data: TData, key: TKey, value: string) => TData
  validateField: (data: TData, key: TKey) => string | undefined
  validate: (data: TData) => FieldErrors<TKey>
  isSectionValid: (data: TData, section: TSection) => boolean
  toRequest: (data: TData) => TRequest
}

export const required =
  (message: string): FieldRule =>
  (value) =>
    value.trim() ? undefined : message

export const maxLength =
  (max: number, message: string): FieldRule =>
  (value) =>
    value.trim().length <= max ? undefined : message

export const minLength =
  (min: number, message: string): FieldRule =>
  (value) =>
    value.length >= min ? undefined : message

export const valid =
  (check: (value: string) => boolean, message: string): FieldRule =>
  (value) =>
    check(value) ? undefined : message

export const validateValue = (value: string, rules: FieldRule[]): string | undefined => {
  for (const rule of rules) {
    const message = rule(value)
    if (message) return message
  }
  return undefined
}

import { formatCPF, validateCPF } from '@/utils/cpf.handlers'
import { onlyDigits } from '@/utils/document.handlers'
import { type FieldRule, type Form, required, valid, validateValue } from '@/utils/form.handlers'

import type { CreateSessionRequest } from '../session.types'
import type {
  CreateSessionFieldKey,
  CreateSessionFormData,
  CreateSessionFormSection,
} from './create-session.form.types'

const RULES: Record<CreateSessionFieldKey, FieldRule[]> = {
  'credentials.document_number': [required('Informe o CPF.'), valid(validateCPF, 'CPF inválido.')],
  'credentials.password': [required('Informe a senha.')],
}

const MASKS: Partial<Record<CreateSessionFieldKey, (value: string) => string>> = {
  'credentials.document_number': formatCPF,
}

const FIELDS = Object.keys(RULES) as CreateSessionFieldKey[]

const splitField = (key: CreateSessionFieldKey): [CreateSessionFormSection, string] =>
  key.split('.') as [CreateSessionFormSection, string]

const getValue = (data: CreateSessionFormData, key: CreateSessionFieldKey): string => {
  const [section, field] = splitField(key)
  const values: Record<string, string> = data[section]
  return values[field]
}

const validateField = (data: CreateSessionFormData, key: CreateSessionFieldKey): string | undefined =>
  validateValue(getValue(data, key), RULES[key])

export const createSessionForm: Form<
  CreateSessionFormData,
  CreateSessionFieldKey,
  CreateSessionFormSection,
  CreateSessionRequest
> = {
  fields: FIELDS,
  initialData: {
    credentials: { document_number: '', password: '' },
  },
  update: (data, key, value) => {
    const [section, field] = splitField(key)
    return { ...data, [section]: { ...data[section], [field]: MASKS[key]?.(value) ?? value } }
  },
  validateField,
  validate: (data) => Object.fromEntries(FIELDS.map((key) => [key, validateField(data, key)])),
  isSectionValid: (data, section) =>
    FIELDS.filter((key) => key.startsWith(`${section}.`)).every((key) => !validateField(data, key)),
  toRequest: ({ credentials }) => ({
    document_number: onlyDigits(credentials.document_number),
    password: credentials.password,
  }),
}

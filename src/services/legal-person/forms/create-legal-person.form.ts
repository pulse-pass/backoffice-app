import { formatCNPJ, validateCNPJ } from '@/utils/cnpj.handlers'
import { formatCPF, validateCPF } from '@/utils/cpf.handlers'
import { onlyDigits } from '@/utils/document.handlers'
import { validateEmail } from '@/utils/email.handlers'
import {
  type FieldRule,
  type Form,
  maxLength,
  minLength,
  required,
  valid,
  validateValue,
} from '@/utils/form.handlers'
import { formatPhone, parsePhone, validatePhone } from '@/utils/phone.handlers'

import type { CreateLegalPersonRequest } from '../legal-person.types'
import type {
  CreateLegalPersonFieldKey,
  CreateLegalPersonFormData,
  CreateLegalPersonFormSection,
} from './create-legal-person.form.types'

const MAX_TEXT_LENGTH = 255
const MIN_PASSWORD_LENGTH = 8
const BRAZIL_COUNTRY_CODE = '55'

const RULES: Record<CreateLegalPersonFieldKey, FieldRule[]> = {
  'company.document_number': [required('Informe o CNPJ.'), valid(validateCNPJ, 'CNPJ inválido.')],
  'company.name': [
    required('Informe a razão social.'),
    maxLength(MAX_TEXT_LENGTH, 'A razão social deve ter até 255 caracteres.'),
  ],
  'company.email': [required('Informe o e-mail.'), valid(validateEmail, 'Informe um e-mail válido.')],
  'company.phone': [required('Informe o telefone.'), valid(validatePhone, 'Informe um telefone com DDD.')],
  'owner.name': [
    required('Informe o nome completo.'),
    maxLength(MAX_TEXT_LENGTH, 'O nome deve ter até 255 caracteres.'),
  ],
  'owner.document_number': [required('Informe o CPF.'), valid(validateCPF, 'CPF inválido.')],
  'owner.email': [required('Informe o e-mail.'), valid(validateEmail, 'Informe um e-mail válido.')],
  'owner.password': [
    required('Informe a senha.'),
    minLength(MIN_PASSWORD_LENGTH, 'A senha precisa ter ao menos 8 caracteres.'),
  ],
}

const MASKS: Partial<Record<CreateLegalPersonFieldKey, (value: string) => string>> = {
  'company.document_number': formatCNPJ,
  'company.phone': formatPhone,
  'owner.document_number': formatCPF,
}

const FIELDS = Object.keys(RULES) as CreateLegalPersonFieldKey[]

const splitField = (key: CreateLegalPersonFieldKey): [CreateLegalPersonFormSection, string] =>
  key.split('.') as [CreateLegalPersonFormSection, string]

const getValue = (data: CreateLegalPersonFormData, key: CreateLegalPersonFieldKey): string => {
  const [section, field] = splitField(key)
  const values: Record<string, string> = data[section]
  return values[field]
}

const validateField = (data: CreateLegalPersonFormData, key: CreateLegalPersonFieldKey): string | undefined =>
  validateValue(getValue(data, key), RULES[key])

export const createLegalPersonForm: Form<
  CreateLegalPersonFormData,
  CreateLegalPersonFieldKey,
  CreateLegalPersonFormSection,
  CreateLegalPersonRequest
> = {
  fields: FIELDS,
  initialData: {
    company: { document_number: '', name: '', email: '', phone: '' },
    owner: { name: '', document_number: '', email: '', password: '' },
  },
  update: (data, key, value) => {
    const [section, field] = splitField(key)
    return { ...data, [section]: { ...data[section], [field]: MASKS[key]?.(value) ?? value } }
  },
  validateField,
  validate: (data) => Object.fromEntries(FIELDS.map((key) => [key, validateField(data, key)])),
  isSectionValid: (data, section) =>
    FIELDS.filter((key) => key.startsWith(`${section}.`)).every((key) => !validateField(data, key)),
  toRequest: ({ company, owner }) => {
    const { area_code, number } = parsePhone(company.phone)
    return {
      document_number: onlyDigits(company.document_number),
      name: company.name.trim(),
      email: company.email.trim(),
      phone_number: { country_code: BRAZIL_COUNTRY_CODE, area_code, number },
      legal_person_collaborators: [
        {
          collaborator_role: 'OWNER',
          document_number: onlyDigits(owner.document_number),
          name: owner.name.trim(),
          email: owner.email.trim(),
          password: owner.password,
        },
      ],
    }
  },
}

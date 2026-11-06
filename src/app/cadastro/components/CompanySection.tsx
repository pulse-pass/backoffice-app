import { Field } from '@/components/Field'
import { Select } from '@/components/Select'
import type { CompanyFormData } from '@/services/legal-person/forms/create-legal-person.form.types'
import { COMPANY_TYPES } from '@/services/legal-person/legal-person.handlers'

import type { SectionProps } from '../page.types'

export function CompanySection({
  values,
  errors,
  onChange,
  onBlur,
  registerField,
}: SectionProps<CompanyFormData>) {
  return (
    <section
      aria-labelledby="company-title"
      className="flex flex-col gap-lg rounded-sm border border-border-subtle bg-bg-surface p-md md:p-xl"
    >
      <h2 id="company-title" className="title-m flex items-baseline gap-sm text-text-primary">
        <span className="mono-m text-text-secondary">01</span>
        Empresa
      </h2>
      <Field
        ref={registerField('company.document_number')}
        id="company-document-number"
        name="company_document_number"
        label="CNPJ"
        required
        numeric
        inputMode="numeric"
        autoComplete="off"
        maxLength={18}
        placeholder="00.000.000/0000-00"
        value={values.document_number}
        error={errors['company.document_number']}
        onChange={(event) => onChange('company.document_number', event.target.value)}
        onBlur={() => onBlur('company.document_number')}
      />
      <Field
        ref={registerField('company.name')}
        id="company-name"
        name="company_name"
        label="Razão social"
        required
        autoComplete="organization"
        value={values.name}
        error={errors['company.name']}
        onChange={(event) => onChange('company.name', event.target.value)}
        onBlur={() => onBlur('company.name')}
      />
      <div className="grid gap-lg md:grid-cols-2">
        <Field
          ref={registerField('company.email')}
          id="company-email"
          name="company_email"
          label="E-mail de contato"
          required
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          value={values.email}
          error={errors['company.email']}
          onChange={(event) => onChange('company.email', event.target.value)}
          onBlur={() => onBlur('company.email')}
        />
        <Field
          ref={registerField('company.phone')}
          id="company-phone"
          name="company_phone"
          label="Celular"
          required
          type="tel"
          numeric
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="(00) 00000-0000"
          value={values.phone}
          error={errors['company.phone']}
          onChange={(event) => onChange('company.phone', event.target.value)}
          onBlur={() => onBlur('company.phone')}
        />
        <Select
          ref={registerField('company.company_type')}
          id="company-type"
          name="company_type"
          label="Tipo da empresa"
          placeholder="Selecione o tipo"
          required
          autoComplete="off"
          value={values.company_type}
          error={errors['company.company_type']}
          onChange={(event) => onChange('company.company_type', event.target.value)}
          onBlur={() => onBlur('company.company_type')}
        >
          {COMPANY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
        <Field
          ref={registerField('company.monthly_revenue')}
          id="company-monthly-revenue"
          name="company_monthly_revenue"
          label="Faturamento mensal"
          required
          numeric
          inputMode="decimal"
          autoComplete="off"
          placeholder="R$ 0,00"
          value={values.monthly_revenue}
          error={errors['company.monthly_revenue']}
          onChange={(event) => onChange('company.monthly_revenue', event.target.value)}
          onBlur={() => onBlur('company.monthly_revenue')}
        />
      </div>
    </section>
  )
}

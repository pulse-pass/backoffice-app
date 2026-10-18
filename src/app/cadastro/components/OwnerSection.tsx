import { useState } from 'react'

import { Field } from '@/components/Field'
import type { OwnerFormData } from '@/services/legal-person/forms/create-legal-person.form.types'

import type { SectionProps } from '../page.types'

export function OwnerSection({
  values,
  errors,
  onChange,
  onBlur,
  registerField,
}: SectionProps<OwnerFormData>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section
      aria-labelledby="owner-title"
      className="flex flex-col gap-lg rounded-sm border border-border-subtle bg-bg-surface p-md md:p-xl"
    >
      <div className="flex flex-col gap-sm">
        <h2 id="owner-title" className="title-m flex items-baseline gap-sm text-text-primary">
          <span className="mono-m text-text-secondary">02</span>
          Responsável pela conta
        </h2>
        <p className="body-s text-text-secondary">
          Quem envia o cadastro vira a dona da conta e pode convidar membros da equipe depois da aprovação.
        </p>
      </div>
      <div className="grid gap-lg md:grid-cols-2">
        <Field
          ref={registerField('owner.name')}
          id="owner-name"
          name="owner_name"
          label="Nome completo"
          required
          autoComplete="name"
          value={values.name}
          error={errors['owner.name']}
          onChange={(event) => onChange('owner.name', event.target.value)}
          onBlur={() => onBlur('owner.name')}
        />
        <Field
          ref={registerField('owner.document_number')}
          id="owner-document-number"
          name="owner_document_number"
          label="CPF"
          required
          numeric
          inputMode="numeric"
          autoComplete="off"
          maxLength={14}
          placeholder="000.000.000-00"
          value={values.document_number}
          error={errors['owner.document_number']}
          onChange={(event) => onChange('owner.document_number', event.target.value)}
          onBlur={() => onBlur('owner.document_number')}
        />
        <Field
          ref={registerField('owner.email')}
          id="owner-email"
          name="owner_email"
          label="E-mail"
          required
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          value={values.email}
          error={errors['owner.email']}
          onChange={(event) => onChange('owner.email', event.target.value)}
          onBlur={() => onBlur('owner.email')}
        />
        <Field
          ref={registerField('owner.password')}
          id="owner-password"
          name="owner_password"
          label="Senha"
          required
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          hint="Mínimo de 8 caracteres."
          value={values.password}
          error={errors['owner.password']}
          onChange={(event) => onChange('owner.password', event.target.value)}
          onBlur={() => onBlur('owner.password')}
          action={
            <button
              type="button"
              className="mono-s flex min-h-11 cursor-pointer items-center px-xs text-text-secondary"
              aria-controls="owner-password"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? 'ocultar' : 'mostrar'}
            </button>
          }
        />
      </div>
    </section>
  )
}

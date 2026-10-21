import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/Button'
import { Field } from '@/components/Field'

import type { PageViewProps } from '../page.types'

export function LoginCard({
  formData,
  errors,
  isSubmitting,
  onChange,
  onBlur,
  registerField,
  onSubmit,
}: PageViewProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section
      aria-labelledby="login-title"
      className="flex w-full max-w-(--container-card) flex-col rounded-sm border border-border-subtle bg-bg-surface p-md md:p-xl"
    >
      <p className="mono-eyebrow text-text-secondary">Acesso único</p>
      <h2 id="login-title" className="title-l mt-md text-text-primary">
        Entrar no backoffice
      </h2>
      <p className="body-s mt-sm text-text-secondary">
        Organizador e administrador usam o mesmo login. O papel da sua conta decide qual área abre.
      </p>
      <form noValidate onSubmit={onSubmit} className="mt-lg flex flex-col gap-lg">
        <Field
          ref={registerField('credentials.document_number')}
          id="login-document-number"
          name="document_number"
          label="CPF"
          required
          numeric
          inputMode="numeric"
          autoComplete="username"
          maxLength={14}
          placeholder="000.000.000-00"
          value={formData.credentials.document_number}
          error={errors['credentials.document_number']}
          onChange={(event) => onChange('credentials.document_number', event.target.value)}
          onBlur={() => onBlur('credentials.document_number')}
        />
        <Field
          ref={registerField('credentials.password')}
          id="login-password"
          name="password"
          label="Senha"
          required
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={formData.credentials.password}
          error={errors['credentials.password']}
          onChange={(event) => onChange('credentials.password', event.target.value)}
          onBlur={() => onBlur('credentials.password')}
          action={
            <button
              type="button"
              className="mono-s flex min-h-11 cursor-pointer items-center px-xs text-text-secondary"
              aria-controls="login-password"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? 'ocultar' : 'mostrar'}
            </button>
          }
        />
        <Button type="submit" loading={isSubmitting} className="w-full">
          Entrar <span aria-hidden="true">→</span>
        </Button>
      </form>
      <hr className="mt-lg border-border-subtle" />
      <p className="body-s mt-lg text-text-secondary">Sua empresa ainda não vende na PulsePass?</p>
      <Link
        href="/cadastro"
        className="button-s mt-xs flex min-h-11 w-fit items-center text-text-primary underline underline-offset-4"
      >
        Cadastrar empresa organizadora <span aria-hidden="true">→</span>
      </Link>
    </section>
  )
}

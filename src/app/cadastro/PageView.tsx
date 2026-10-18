import Link from 'next/link'
import type { SubmitEvent } from 'react'

import { Button } from '@/components/Button'
import { PublicHeader } from '@/components/PublicHeader'
import type {
  CreateLegalPersonFieldErrors,
  CreateLegalPersonFieldKey,
  CreateLegalPersonFormData,
} from '@/services/legal-person/forms/create-legal-person.form.types'

import { CompanySection } from './components/CompanySection'
import { OwnerSection } from './components/OwnerSection'
import { RegistrationIntro } from './components/RegistrationIntro'

interface PageViewProps {
  formData: CreateLegalPersonFormData
  errors: CreateLegalPersonFieldErrors
  isSubmitting: boolean
  companyValid: boolean
  ownerValid: boolean
  onChange: (key: CreateLegalPersonFieldKey, value: string) => void
  onBlur: (key: CreateLegalPersonFieldKey) => void
  registerField: (key: CreateLegalPersonFieldKey) => (element: HTMLInputElement | null) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

export function PageView({
  formData,
  errors,
  isSubmitting,
  companyValid,
  ownerValid,
  onChange,
  onBlur,
  registerField,
  onSubmit,
}: PageViewProps) {
  return (
    <div className="min-h-dvh">
      <PublicHeader
        action={
          <Button variant="outline" size="s" href="/login">
            Já tenho conta · Entrar
          </Button>
        }
      />
      <main className="mx-auto grid w-full max-w-(--container-page) gap-lg px-md pt-xl pb-2xl lg:grid-cols-[var(--column-intro)_minmax(0,1fr)] lg:gap-x-3xl lg:px-3xl lg:pt-2xl lg:pb-3xl">
        <RegistrationIntro companyValid={companyValid} ownerValid={ownerValid} />
        <form noValidate onSubmit={onSubmit} className="flex min-w-0 flex-col gap-lg">
          <CompanySection
            values={formData.company}
            errors={errors}
            onChange={onChange}
            onBlur={onBlur}
            registerField={registerField}
          />
          <OwnerSection
            values={formData.owner}
            errors={errors}
            onChange={onChange}
            onBlur={onBlur}
            registerField={registerField}
          />
          <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between md:gap-lg">
            <p className="body-s text-text-secondary">
              Ao enviar, você concorda com os Termos de uso para organizadores e com a análise dos dados da
              empresa.
            </p>
            <Button type="submit" loading={isSubmitting} className="w-full shrink-0 md:w-auto">
              Enviar cadastro <span aria-hidden="true">→</span>
            </Button>
          </div>
          <Link
            href="/login"
            className="button-s flex min-h-11 w-fit items-center text-text-primary underline underline-offset-4 md:hidden"
          >
            Já tem conta? Entrar <span aria-hidden="true">→</span>
          </Link>
        </form>
      </main>
    </div>
  )
}

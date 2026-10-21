'use client'

import { useRouter } from 'next/navigation'
import { type SubmitEvent, useRef, useState } from 'react'

import { toast } from '@/lib/toast'
import { getApiErrorMessage } from '@/services/api/api-error.handlers'
import { createLegalPersonForm } from '@/services/legal-person/forms/create-legal-person.form'
import type { CreateLegalPersonFieldKey } from '@/services/legal-person/forms/create-legal-person.form.types'
import { legalPersonApi } from '@/services/legal-person/legal-person.api'
import type { CreateLegalPersonResponse } from '@/services/legal-person/legal-person.types'
import { legalPersonStore } from '@/stores/legal-person.store'

import type { CadastroPageState } from './page.types'
import { PageView } from './PageView'

const INITIAL_STATE: CadastroPageState = {
  form: { data: createLegalPersonForm.initialData, errors: {}, touched: {} },
  submission: { isSubmitting: false },
}

export default function CadastroPage() {
  const router = useRouter()
  const [state, setState] = useState<CadastroPageState>(INITIAL_STATE)
  const fieldRefs = useRef<Partial<Record<CreateLegalPersonFieldKey, HTMLInputElement | null>>>({})
  const isSubmittingRef = useRef(false)

  const registerField = (key: CreateLegalPersonFieldKey) => (element: HTMLInputElement | null) => {
    fieldRefs.current[key] = element
  }

  const focusField = (key: CreateLegalPersonFieldKey) => {
    fieldRefs.current[key]?.focus()
  }

  const setSubmitting = (isSubmitting: boolean) => {
    isSubmittingRef.current = isSubmitting
    setState((current) => ({ ...current, submission: { isSubmitting } }))
  }

  const handleChange = (key: CreateLegalPersonFieldKey, value: string) => {
    setState((current) => ({
      ...current,
      form: {
        data: createLegalPersonForm.update(current.form.data, key, value),
        errors: { ...current.form.errors, [key]: undefined },
        touched: { ...current.form.touched, [key]: true },
      },
    }))
  }

  const handleBlur = (key: CreateLegalPersonFieldKey) => {
    if (!state.form.touched[key]) return
    const message = createLegalPersonForm.validateField(state.form.data, key)
    setState((current) => ({
      ...current,
      form: { ...current.form, errors: { ...current.form.errors, [key]: message } },
    }))
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmittingRef.current) return

    const nextErrors = createLegalPersonForm.validate(state.form.data)
    setState((current) => ({
      ...current,
      form: {
        ...current.form,
        errors: nextErrors,
        touched: Object.fromEntries(createLegalPersonForm.fields.map((key) => [key, true])),
      },
    }))
    const firstInvalid = createLegalPersonForm.fields.find((key) => nextErrors[key])
    if (firstInvalid) {
      focusField(firstInvalid)
      return
    }

    setSubmitting(true)
    let response: CreateLegalPersonResponse
    try {
      response = await legalPersonApi.createLegalPerson(createLegalPersonForm.toRequest(state.form.data))
    } catch (error) {
      toast.error(getApiErrorMessage(error))
      setSubmitting(false)
      return
    }
    legalPersonStore.setLegalPerson(response)
    router.push('/cadastro/enviado')
  }

  return (
    <PageView
      formData={state.form.data}
      errors={state.form.errors}
      isSubmitting={state.submission.isSubmitting}
      companyValid={createLegalPersonForm.isSectionValid(state.form.data, 'company')}
      ownerValid={createLegalPersonForm.isSectionValid(state.form.data, 'owner')}
      onChange={handleChange}
      onBlur={handleBlur}
      registerField={registerField}
      onSubmit={handleSubmit}
    />
  )
}

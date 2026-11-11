'use client'

import { useRouter } from 'next/navigation'
import { type SubmitEvent, useEffect, useRef, useState } from 'react'

import { toast } from '@/lib/toast'
import { getApiErrorMessage } from '@/services/api/api-error.handlers'
import { createLegalPersonForm } from '@/services/legal-person/forms/create-legal-person.form'
import type {
  CreateLegalPersonFieldKey,
  CreateLegalPersonFormData,
} from '@/services/legal-person/forms/create-legal-person.form.types'
import { legalPersonApi } from '@/services/legal-person/legal-person.api'
import { postalCodeApi } from '@/services/postal-code/postal-code.api'
import { onlyDigits } from '@/utils/document.handlers'
import { formatPostalCode, validatePostalCode } from '@/utils/postal-code.handlers'

import type { CadastroPageState, FieldElement, PostalCodeLookup } from './page.types'
import { PageView } from './PageView'

const INITIAL_STATE: CadastroPageState = {
  form: { data: createLegalPersonForm.initialData, errors: {}, touched: {} },
  submission: { isSubmitting: false },
  postalCodeLookup: { status: 'idle', postalCode: '' },
}

export default function CadastroPage() {
  const router = useRouter()
  const [state, setState] = useState<CadastroPageState>(INITIAL_STATE)
  const fieldRefs = useRef<Partial<Record<CreateLegalPersonFieldKey, FieldElement | null>>>({})
  const isSubmittingRef = useRef(false)
  const formDataRef = useRef(INITIAL_STATE.form.data)
  const lookupRef = useRef<PostalCodeLookup>(INITIAL_STATE.postalCodeLookup)
  const lookupAbortRef = useRef<AbortController | null>(null)
  const lookupPromiseRef = useRef<Promise<void>>(Promise.resolve())

  useEffect(() => () => lookupAbortRef.current?.abort(), [])

  const registerField = (key: CreateLegalPersonFieldKey) => (element: FieldElement | null) => {
    fieldRefs.current[key] = element
  }

  const focusField = (key: CreateLegalPersonFieldKey) => {
    fieldRefs.current[key]?.focus()
  }

  const updateLookup = (lookup: PostalCodeLookup) => {
    lookupRef.current = lookup
    setState((current) => ({ ...current, postalCodeLookup: lookup }))
  }

  const setSubmitting = (isSubmitting: boolean) => {
    isSubmittingRef.current = isSubmitting
    setState((current) => ({ ...current, submission: { isSubmitting } }))
  }

  const getPostalCodeError = (data: CreateLegalPersonFormData): string | undefined =>
    createLegalPersonForm.validateField(data, 'address.postal_code') ||
    (lookupRef.current.status === 'not_found' ? 'CEP não encontrado.' : undefined)

  const updatePostalCodeAddress = async (postalCode: string, signal: AbortSignal) => {
    const result = await postalCodeApi.getPostalCode(postalCode, signal).catch(() => undefined)
    if (signal.aborted) return
    updateLookup({ status: result?.status ?? 'unavailable', postalCode })
    if (result?.status === 'not_found') {
      setState((current) => ({
        ...current,
        form: {
          ...current.form,
          errors: { ...current.form.errors, 'address.postal_code': 'CEP não encontrado.' },
        },
      }))
    }
    if (result?.status === 'found') {
      const withStreet = result.street
        ? createLegalPersonForm.update(formDataRef.current, 'address.street', result.street)
        : formDataRef.current
      const data = result.neighborhood
        ? createLegalPersonForm.update(withStreet, 'address.neighborhood', result.neighborhood)
        : withStreet
      formDataRef.current = data
      setState((current) => ({
        ...current,
        form: {
          ...current.form,
          data,
          errors: {
            ...current.form.errors,
            'address.street': result.street ? undefined : current.form.errors['address.street'],
            'address.neighborhood': result.neighborhood
              ? undefined
              : current.form.errors['address.neighborhood'],
          },
        },
      }))
    }
  }

  const updatePostalCodeLookup = (value: string) => {
    const postalCode = onlyDigits(formatPostalCode(value))
    if (!validatePostalCode(postalCode)) {
      lookupAbortRef.current?.abort()
      updateLookup({ status: 'idle', postalCode: '' })
      return
    }
    const isSameLookup =
      postalCode === lookupRef.current.postalCode && lookupRef.current.status !== 'unavailable'
    if (isSameLookup) return
    lookupAbortRef.current?.abort()
    const controller = new AbortController()
    lookupAbortRef.current = controller
    updateLookup({ status: 'loading', postalCode })
    lookupPromiseRef.current = updatePostalCodeAddress(postalCode, controller.signal)
  }

  const handleChange = (key: CreateLegalPersonFieldKey, value: string) => {
    const data = createLegalPersonForm.update(formDataRef.current, key, value)
    formDataRef.current = data
    setState((current) => ({
      ...current,
      form: {
        data,
        errors: { ...current.form.errors, [key]: undefined },
        touched: { ...current.form.touched, [key]: true },
      },
    }))
    if (key === 'address.postal_code') updatePostalCodeLookup(value)
  }

  const handleBlur = (key: CreateLegalPersonFieldKey) => {
    if (!state.form.touched[key]) return
    const message =
      key === 'address.postal_code'
        ? getPostalCodeError(formDataRef.current)
        : createLegalPersonForm.validateField(formDataRef.current, key)
    const data = createLegalPersonForm.complete?.(formDataRef.current, key) ?? formDataRef.current
    formDataRef.current = data
    setState((current) => ({
      ...current,
      form: { ...current.form, data, errors: { ...current.form.errors, [key]: message } },
    }))
    if (key === 'address.postal_code' && lookupRef.current.status === 'unavailable') {
      updatePostalCodeLookup(formDataRef.current.address.postal_code)
    }
  }

  const validateForm = (data: CreateLegalPersonFormData): boolean => {
    const nextErrors = {
      ...createLegalPersonForm.validate(data),
      'address.postal_code': getPostalCodeError(data),
    }
    setState((current) => ({
      ...current,
      form: {
        ...current.form,
        errors: nextErrors,
        touched: Object.fromEntries(createLegalPersonForm.fields.map((key) => [key, true])),
      },
    }))
    const firstInvalid = createLegalPersonForm.fields.find((key) => nextErrors[key])
    if (firstInvalid) focusField(firstInvalid)
    return !firstInvalid
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmittingRef.current) return
    if (!validateForm(formDataRef.current)) return

    setSubmitting(true)
    if (lookupRef.current.status === 'loading') {
      let pending: Promise<void>
      do {
        pending = lookupPromiseRef.current
        await pending
      } while (lookupPromiseRef.current !== pending)
      if (!validateForm(formDataRef.current)) {
        setSubmitting(false)
        return
      }
    }

    try {
      await legalPersonApi.createLegalPerson(createLegalPersonForm.toRequest(formDataRef.current))
    } catch (error) {
      toast.error(getApiErrorMessage(error))
      setSubmitting(false)
      return
    }
    toast.success('Cadastro enviado. Entre para acompanhar a análise.')
    router.push('/login')
  }

  return (
    <PageView
      formData={state.form.data}
      errors={state.form.errors}
      isSubmitting={state.submission.isSubmitting}
      postalCodeStatus={state.postalCodeLookup.status}
      companyValid={createLegalPersonForm.isSectionValid(state.form.data, 'company')}
      addressValid={createLegalPersonForm.isSectionValid(state.form.data, 'address')}
      ownerValid={createLegalPersonForm.isSectionValid(state.form.data, 'owner')}
      onChange={handleChange}
      onBlur={handleBlur}
      registerField={registerField}
      onSubmit={handleSubmit}
    />
  )
}

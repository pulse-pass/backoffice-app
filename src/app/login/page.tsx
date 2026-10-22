'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { type SubmitEvent, useEffect, useRef, useState } from 'react'

import { toast } from '@/lib/toast'
import { getApiErrorMessage } from '@/services/api/api-error.handlers'
import { createSessionForm } from '@/services/session/forms/create-session.form'
import type { CreateSessionFieldKey } from '@/services/session/forms/create-session.form.types'
import { sessionApi } from '@/services/session/session.api'
import type { SessionProfile } from '@/services/session/session.types'
import { sessionStore } from '@/stores/session.store'

import type { LoginPageState } from './page.types'
import { PageView } from './PageView'

const INITIAL_STATE: LoginPageState = {
  form: { data: createSessionForm.initialData, errors: {}, touched: {} },
  submission: { isSubmitting: false },
}

function LoginPage() {
  const router = useRouter()
  const [state, setState] = useState<LoginPageState>(INITIAL_STATE)
  const fieldRefs = useRef<Partial<Record<CreateSessionFieldKey, HTMLInputElement | null>>>({})
  const isSubmittingRef = useRef(false)
  const isHydrated = sessionStore.isHydrated
  const role = sessionStore.role
  const areaPath = sessionStore.areaPath

  useEffect(() => {
    if (isHydrated && role) router.replace(areaPath)
  })

  const registerField = (key: CreateSessionFieldKey) => (element: HTMLInputElement | null) => {
    fieldRefs.current[key] = element
  }

  const focusField = (key: CreateSessionFieldKey) => {
    fieldRefs.current[key]?.focus()
  }

  const setSubmitting = (isSubmitting: boolean) => {
    isSubmittingRef.current = isSubmitting
    setState((current) => ({ ...current, submission: { isSubmitting } }))
  }

  const rejectWithoutAccess = async () => {
    await sessionApi.deleteSession().catch(() => undefined)
    sessionStore.clear()
    toast.error('Esta conta não tem acesso ao backoffice.')
    setSubmitting(false)
  }

  const handleChange = (key: CreateSessionFieldKey, value: string) => {
    setState((current) => ({
      ...current,
      form: {
        data: createSessionForm.update(current.form.data, key, value),
        errors: { ...current.form.errors, [key]: undefined },
        touched: { ...current.form.touched, [key]: true },
      },
    }))
  }

  const handleBlur = (key: CreateSessionFieldKey) => {
    if (!state.form.touched[key]) return
    const message = createSessionForm.validateField(state.form.data, key)
    setState((current) => ({
      ...current,
      form: { ...current.form, errors: { ...current.form.errors, [key]: message } },
    }))
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmittingRef.current) return

    const nextErrors = createSessionForm.validate(state.form.data)
    setState((current) => ({
      ...current,
      form: {
        ...current.form,
        errors: nextErrors,
        touched: Object.fromEntries(createSessionForm.fields.map((key) => [key, true])),
      },
    }))
    const firstInvalid = createSessionForm.fields.find((key) => nextErrors[key])
    if (firstInvalid) {
      focusField(firstInvalid)
      return
    }

    setSubmitting(true)
    let profile: SessionProfile
    try {
      await sessionApi.createSession(createSessionForm.toRequest(state.form.data))
      profile = await sessionApi.getSession()
    } catch (error) {
      toast.error(getApiErrorMessage(error))
      setSubmitting(false)
      return
    }
    sessionStore.setProfile(profile)
    if (!sessionStore.role) {
      await rejectWithoutAccess()
      return
    }
    router.replace(sessionStore.areaPath)
  }

  return (
    <PageView
      formData={state.form.data}
      errors={state.form.errors}
      isSubmitting={state.submission.isSubmitting}
      onChange={handleChange}
      onBlur={handleBlur}
      registerField={registerField}
      onSubmit={handleSubmit}
    />
  )
}

export default observer(LoginPage)

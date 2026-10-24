import { API_ERRORS } from '@/services/api/api.errors'
import type { ExpectedApiError } from '@/services/api/api-error.types'

export const SESSION_ERRORS = {
  refreshSession: {
    rejected: [API_ERRORS.badRequest, API_ERRORS.unauthorized],
  },
} satisfies Record<string, Record<string, ExpectedApiError[]>>

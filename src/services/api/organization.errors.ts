import type { ExpectedApiError } from './api-error.types'

export const ORGANIZATION_SERVICE_ERRORS = {
  paymentAccountCreationFailed: { status: 422, code: 'ORG00005' },
} satisfies Record<string, ExpectedApiError>

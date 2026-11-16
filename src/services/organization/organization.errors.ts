import type { ExpectedApiError } from '@/services/api/api-error.types'
import { ORGANIZATION_SERVICE_ERRORS } from '@/services/api/organization.errors'

export const ORGANIZATION_ERRORS = {
  deleteInternalOrganization: {
    failed: [ORGANIZATION_SERVICE_ERRORS.accessRevocationFailed],
  },
  updateInternalOrganization: {
    failed: [ORGANIZATION_SERVICE_ERRORS.paymentAccountCreationFailed],
  },
} satisfies Record<string, Record<string, ExpectedApiError[]>>

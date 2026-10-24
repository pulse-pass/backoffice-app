import type { ExpectedApiError } from './api-error.types'

export const API_ERRORS = {
  badRequest: { status: 400, code: 'GEN00400' },
  unauthorized: { status: 401, code: 'GEN00401' },
  forbidden: { status: 403, code: 'GEN00403' },
  notFound: { status: 404, code: 'GEN00404' },
  methodNotAllowed: { status: 405, code: 'GEN00405' },
  unsupportedMediaType: { status: 415, code: 'GEN00415' },
  internal: { status: 500, code: 'GEN00500' },
} satisfies Record<string, ExpectedApiError>

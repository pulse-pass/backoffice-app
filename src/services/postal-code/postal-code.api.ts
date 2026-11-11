import { isPostalCodeNotFound, isPostalCodeResponse } from './postal-code.handlers'
import type { PostalCodeLookupResult } from './postal-code.types'

const BASE_URL = 'https://viacep.com.br/ws'
const TIMEOUT_MS = 5000

export class PostalCodeApi {
  async getPostalCode(postalCode: string, signal: AbortSignal): Promise<PostalCodeLookupResult> {
    const response = await fetch(`${BASE_URL}/${postalCode}/json/`, {
      credentials: 'omit',
      signal: AbortSignal.any([signal, AbortSignal.timeout(TIMEOUT_MS)]),
    })
    if (!response.ok) throw new Error(`Postal code lookup failed with status ${response.status}`)
    const body: unknown = await response.json()
    if (isPostalCodeNotFound(body)) return { status: 'not_found' }
    if (!isPostalCodeResponse(body)) throw new Error('Postal code lookup returned an unexpected body')
    return { status: 'found', street: body.logradouro, neighborhood: body.bairro }
  }
}

export const postalCodeApi = new PostalCodeApi()

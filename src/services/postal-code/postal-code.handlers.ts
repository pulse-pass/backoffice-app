import type { GetPostalCodeNotFoundResponse, GetPostalCodeResponse } from './postal-code.types'

const isRecord = (body: unknown): body is Record<string, unknown> => typeof body === 'object' && body !== null

export const isPostalCodeNotFound = (body: unknown): body is GetPostalCodeNotFoundResponse =>
  isRecord(body) && (body.erro === 'true' || body.erro === true)

export const isPostalCodeResponse = (body: unknown): body is GetPostalCodeResponse =>
  isRecord(body) &&
  typeof body.cep === 'string' &&
  typeof body.logradouro === 'string' &&
  typeof body.complemento === 'string' &&
  typeof body.bairro === 'string' &&
  typeof body.localidade === 'string' &&
  typeof body.uf === 'string'

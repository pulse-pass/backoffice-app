export interface GetPostalCodeResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: 'true' | true
}

export interface GetPostalCodeNotFoundResponse {
  erro: 'true' | true
}

export type PostalCodeLookupResult =
  { status: 'found'; street: string; neighborhood: string } | { status: 'not_found' }

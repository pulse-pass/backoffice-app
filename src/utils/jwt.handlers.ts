const decodeBase64Url = (value: string): string => {
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/')
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='))
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)))
}

export const decodeJwtPayload = (token: string): unknown => {
  try {
    return JSON.parse(decodeBase64Url(token.split('.')[1] ?? ''))
  } catch {
    return null
  }
}

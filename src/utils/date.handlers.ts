const TIME_ZONE = 'America/Sao_Paulo'

const getDateParts = (value: string): Partial<Record<Intl.DateTimeFormatPartTypes, string>> =>
  Object.fromEntries(
    new Intl.DateTimeFormat('pt-BR', {
      timeZone: TIME_ZONE,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date(value))
      .map((part) => [part.type, part.value]),
  )

export const formatDate = (value: string): string => {
  const { day, month, year } = getDateParts(value)
  return `${day}.${month}.${year}`
}

export const formatTime = (value: string): string => {
  const { hour, minute } = getDateParts(value)
  return `${hour}:${minute}`
}

export const formatDateTime = (value: string): string => {
  const { day, month, hour, minute } = getDateParts(value)
  return `${day}.${month} ${hour}:${minute}`
}

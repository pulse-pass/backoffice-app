export const formatDate = (value: string): string =>
  `${value.slice(8, 10)}.${value.slice(5, 7)}.${value.slice(0, 4)}`

export const formatTime = (value: string): string => value.slice(11, 16)

export const formatDateTime = (value: string): string =>
  `${value.slice(8, 10)}.${value.slice(5, 7)} ${formatTime(value)}`

export const DATE_MIN = '1900-01-01'
export const DATE_MAX_YEAR = 2100

export const toInputDate = (date: Date): string => date.toISOString().split('T')[0]

export const todayInputDate = (): string => toInputDate(new Date())

export const addDays = (dateStr: string, days: number): string => {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return toInputDate(d)
}

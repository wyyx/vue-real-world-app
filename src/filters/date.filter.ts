import format from 'date-fns/format'

export const dateFilter = date => {
  return format(date, 'MMMM D, YYYY')
}

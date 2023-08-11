export const formatDate = (date: string) => {
  const _date =  new Date(date)
  const [year, month, day] = _date.toISOString().split("T")[0].split('-')
  return `${day}-${month}-${year}`
}

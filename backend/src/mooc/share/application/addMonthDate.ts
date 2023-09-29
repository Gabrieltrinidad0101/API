const addMonthDate = (date: Date): Date => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + 1)
  return result
}
export default addMonthDate

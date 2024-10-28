export const parseDate = (dateConstructorParam, full = false) => {
  const d = new Date(dateConstructorParam).toLocaleString()
  return full ? d : d.slice(12, 17)
}

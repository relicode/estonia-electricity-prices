export const parseDate = (dateConstructorParam, full = false) => {
  const d = new Date(dateConstructorParam).toLocaleString()
  return full ? d : d.slice(12, 17)
}

export const parseIdAttr = (dateString, hours) => {
  let date = new Date()
  if (typeof dateString === 'string') {
    const [year, month, day] = dateString.split('-').map((s) => parseInt(s, 10))
    date = new Date(year, month - 1, day)
  }
  if (typeof hours === 'string') date.setHours(parseInt(hours.split(':')[0], 10))

  return ['price-row', date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours()].join('-')
}

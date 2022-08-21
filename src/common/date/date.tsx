


export const convertToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const gotMonth = date.getMonth() + 1
  const gotDay = date.getDate()

  const month = gotMonth < 10 ? '0' + gotMonth : gotMonth
  const day = gotDay < 10 ? '0' + gotDay : gotDay

  return `${year}-${month}-${day}`
}

export const convertToTimestamp = (date: string) => {
  const converted = Date.parse(date) / 1000
  return converted
}

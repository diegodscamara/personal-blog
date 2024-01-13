/**
 * Format a date string into a 'yyyy-MM-dd' format.
 *
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 */
export function formatDateForSearch(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months start at 0
  const day = date.getDate()

  // Pad the month and day with leading zeros if necessary
  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedDay = day < 10 ? `0${day}` : day

  return `${year}-${formattedMonth}-${formattedDay}`
}

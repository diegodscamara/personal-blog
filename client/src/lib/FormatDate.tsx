/**
 * Format a date string into a formatted date string.
 *
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

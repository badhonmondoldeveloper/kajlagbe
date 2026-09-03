/**
 * Format a date to standard Bangladesh display format (DD/MM/YYYY)
 */
export function formatDateBD(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Dhaka',
  }).format(d);
}

/**
 * Format a date with time in Asia/Dhaka timezone
 */
export function formatDateTimeBD(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Dhaka',
  }).format(d);
}

/**
 * Get ISO string safely
 */
export function toSafeISOString(date: Date | string | number): string {
  const d = new Date(date);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}


/**
 * Shared formatting helpers for numeric values, durations, distances, counts, and percentages.
 * Ensures consistent Indonesian notation without raw floating-point decimals.
 */

/**
 * Format duration in minutes into concise Indonesian units (j = jam, m = menit, d = detik).
 * Example: 60.06999999999999 -> "1j 0m 4d"
 */
export function formatDurationFormatted(totalMinutes: number): string {
  if (!totalMinutes || isNaN(totalMinutes) || totalMinutes <= 0) {
    return '0m'
  }

  const totalSeconds = Math.round(totalMinutes * 60)
  const hours = Math.floor(totalSeconds / 3600)
  const remainingSeconds = totalSeconds % 3600
  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  if (hours > 0) {
    if (seconds > 0) {
      return `${hours}j ${minutes}m ${seconds}d`
    }
    if (minutes > 0) {
      return `${hours}j ${minutes}m`
    }
    return `${hours}j`
  }

  if (minutes > 0) {
    if (seconds > 0) {
      return `${minutes}m ${seconds}d`
    }
    return `${minutes}m`
  }

  return `${seconds}d`
}

/**
 * Format duration into full Indonesian words for tooltips.
 * Example: 60.06999999999999 -> "1 jam 0 menit 4 detik"
 */
export function formatDurationLong(totalMinutes: number): string {
  if (!totalMinutes || isNaN(totalMinutes) || totalMinutes <= 0) {
    return '0 menit'
  }

  const totalSeconds = Math.round(totalMinutes * 60)
  const hours = Math.floor(totalSeconds / 3600)
  const remainingSeconds = totalSeconds % 3600
  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  const parts: string[] = []
  if (hours > 0) parts.push(`${hours} jam`)
  if (minutes > 0 || hours > 0) parts.push(`${minutes} menit`)
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} detik`)

  return parts.join(' ')
}

/**
 * Format distance in kilometers to at most 2 decimal places without trailing zeros.
 * Example: 1.125 -> "1.13 km", 2.0 -> "2 km", 0.6200000001 -> "0.62 km"
 */
export function formatDistanceKm(km: number): string {
  if (!km || isNaN(km) || km <= 0) {
    return '0 km'
  }

  // Round to max 2 decimals
  const rounded = Math.round(km * 100) / 100
  return `${rounded.toLocaleString('id-ID', { maximumFractionDigits: 2 })} km`
}

/**
 * Format whole counts with Indonesian thousands separator.
 * Example: 1234 -> "1.234"
 */
export function formatCount(count: number): string {
  if (count === undefined || count === null || isNaN(count)) return '0'
  return Math.round(count).toLocaleString('id-ID')
}

/**
 * Format percentage to at most 1 decimal place with Indonesian comma separator.
 * Example: 93.24 -> "93,2%", null -> "N/A"
 */
export function formatPercentage(pct: number | null): string {
  if (pct === null || pct === undefined || isNaN(pct)) return 'N/A'
  const rounded = Math.round(pct * 10) / 10
  return `${rounded.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`
}

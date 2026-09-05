/** Health state values returned by platform-probe's `/api/status` endpoint. */
export type StatusLevel = 'operational' | 'degraded' | 'down' | 'unknown'

/** A single monitored component within a group. */
export interface StatusComponent {
  name: string
  status: StatusLevel
}

/** A logical capability group containing one or more components. */
export interface StatusGroup {
  name: string
  status: StatusLevel
  components: StatusComponent[]
}

/** The full snapshot returned by `GET /api/status`. */
export interface StatusSnapshot {
  generated_at: string
  overall: StatusLevel
  groups: StatusGroup[]
}

const STATUS_LEVELS = new Set<string>(['operational', 'degraded', 'down', 'unknown'])

/** Type guard for `StatusLevel`. Validates that a raw value is one of the known status strings. */
export function isStatusLevel(s: unknown): s is StatusLevel {
  return typeof s === 'string' && STATUS_LEVELS.has(s)
}

/**
 * Parse and validate a raw API response as a `StatusSnapshot`.
 * Returns `null` if the required fields are absent or have unexpected types,
 * so callers can treat an invalid response the same as a network error.
 */
export function parseSnapshot(raw: unknown): StatusSnapshot | null {
  if (raw === null || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (!isStatusLevel(r.overall)) return null
  if (typeof r.generated_at !== 'string') return null
  if (!Array.isArray(r.groups)) return null
  return raw as StatusSnapshot
}

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { parseSnapshot } from '../status.js'
import type { StatusLevel } from '../status.js'

const props = withDefaults(defineProps<{
  /** URL of the `GET /api/status` endpoint to poll. */
  apiUrl?: string
  /** URL the widget links to (the human-readable status page). */
  href?: string
  /** Poll interval in milliseconds. */
  pollInterval?: number
}>(), {
  apiUrl: 'https://status.meddleware.co.uk/api/status',
  href: 'https://status.meddleware.co.uk',
  pollInterval: 60_000,
})

type WidgetState = 'ok' | 'degraded' | 'error'

const STATE_MAP: Record<StatusLevel, WidgetState> = {
  operational: 'ok',
  degraded: 'degraded',
  down: 'error',
  unknown: 'degraded',
}

const LABEL: Record<StatusLevel, string> = {
  operational: 'All systems operational',
  degraded: 'Degraded',
  down: 'Major outage',
  unknown: 'Status unknown',
}

const state = ref<WidgetState>('ok')
const label = ref('All systems operational')
let timer: ReturnType<typeof setInterval> | null = null

async function poll(): Promise<void> {
  try {
    const res = await fetch(props.apiUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const snap = parseSnapshot(await res.json())
    if (!snap) throw new Error('unexpected response shape')
    state.value = STATE_MAP[snap.overall]
    label.value = LABEL[snap.overall]
  } catch {
    state.value = 'error'
    label.value = 'Status unavailable'
  }
}

onMounted(() => {
  poll()
  timer = setInterval(poll, props.pollInterval)
})
onUnmounted(() => {
  if (timer !== null) clearInterval(timer)
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    class="status-widget"
    :class="`status-widget--${state}`"
    :title="`Platform status: ${label}`"
  >
    <span class="status-widget__dot" aria-hidden="true" />
    <span class="status-widget__label">{{ label }}</span>
  </a>
</template>

<style scoped>
.status-widget {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: inherit;
  font-size: 0.8rem;
  opacity: 0.85;
}
.status-widget:hover { opacity: 1; }

.status-widget__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-widget--ok       .status-widget__dot { background: var(--mw-ok-500); }
.status-widget--degraded .status-widget__dot { background: var(--mw-gold-500); }
.status-widget--error    .status-widget__dot { background: var(--mw-danger-500); }
</style>

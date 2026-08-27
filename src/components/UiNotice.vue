<script setup lang="ts">
import { computed } from 'vue'

/** Inline notice/alert. Abstracted from the token-deployer `AppNotice.vue`. */
const props = defineProps<{ type?: 'info' | 'error' | 'ok' }>()

const role = computed(() => {
  if (props.type === 'error') return 'alert'
  if (props.type === 'ok') return 'status'
  return undefined
})
</script>

<template>
  <p class="mw-notice" :class="type && type !== 'info' ? `mw-notice--${type}` : ''" :role="role">
    <slot />
  </p>
</template>

<style scoped>
.mw-notice {
  margin: 0;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border);
  border-left-width: 3px;
  border-radius: var(--mw-radius, 10px);
  background: var(--lift);
  color: var(--text);
  font-size: 0.9rem;
}
.mw-notice--error {
  border-left-color: var(--danger);
  color: var(--danger);
  background: color-mix(in srgb, var(--danger) 8%, transparent);
}
.mw-notice--ok {
  border-left-color: var(--ok);
  color: var(--ok);
  background: color-mix(in srgb, var(--ok) 8%, transparent);
}
</style>

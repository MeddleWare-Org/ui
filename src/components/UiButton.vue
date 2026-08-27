<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  { variant: 'primary', type: 'button', disabled: false },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="mw-btn"
    :class="`mw-btn--${variant}`"
  >
    <slot />
  </button>
</template>

<style scoped>
.mw-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: var(--mw-radius, 10px);
  border: 1px solid transparent;
  font: inherit;
  font-weight: 550;
  cursor: pointer;
  transition:
    filter 0.12s ease,
    background 0.12s ease;
}
.mw-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.mw-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.mw-btn--primary {
  background: var(--accent);
  color: var(--accent-contrast);
}
.mw-btn--primary:not(:disabled):hover {
  filter: brightness(1.08);
}
.mw-btn--secondary {
  background: var(--secondary);
  color: var(--secondary-contrast);
}
.mw-btn--secondary:not(:disabled):hover {
  filter: brightness(1.08);
}
.mw-btn--ghost {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}
.mw-btn--ghost:not(:disabled):hover {
  background: var(--lift);
}
.mw-btn--danger {
  background: var(--danger);
  color: #fff;
}
.mw-btn--danger:not(:disabled):hover {
  filter: brightness(1.08);
}
</style>

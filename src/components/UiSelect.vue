<script setup lang="ts">
/** Styled native <select> with a chevron overlay. Abstracted from the
 * token-deployer `FormSelect.vue` (kept visually identical). */
defineOptions({ inheritAttrs: false })
const model = defineModel<string>()
</script>

<template>
  <div class="mw-select">
    <select v-bind="$attrs" v-model="model"><slot /></select>
    <svg
      class="mw-select__chevron"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      aria-hidden="true"
    >
      <path d="M1 1l5 5 5-5" />
    </svg>
  </div>
</template>

<style scoped>
.mw-select {
  position: relative;
}
.mw-select select {
  appearance: none;
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.7rem;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--mw-radius, 10px);
  font: inherit;
}
.mw-select select:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}
.mw-select__chevron {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  stroke: var(--muted);
  stroke-width: 1.5;
  fill: none;
}
</style>

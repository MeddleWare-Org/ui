<script setup lang="ts">
defineProps<{
  /** Optional card heading rendered in the header slot fallback. */
  title?: string
}>()
</script>

<template>
  <section class="mw-card">
    <header v-if="title || $slots.header" class="mw-card__header">
      <slot name="header">
        <h3 class="mw-card__title">{{ title }}</h3>
      </slot>
    </header>
    <div class="mw-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="mw-card__footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
.mw-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--mw-radius, 10px);
  color: var(--text);
  overflow: hidden;
}
.mw-card__header {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);
}
.mw-card__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
.mw-card__body {
  padding: 1rem;
}
.mw-card__footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border);
  background: var(--lift);
}
</style>

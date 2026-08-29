<script setup lang="ts">
import { computed } from 'vue'
import { panelVars, type PanelVariant, type PanelColors } from '../internal/panel'

const props = withDefaults(
  defineProps<{
    /** light | dark | transparent — default transparent (footers sit over the page background). */
    variant?: PanelVariant
    /** Per-instance colour overrides; token values are used by default. */
    colors?: PanelColors
  }>(),
  { variant: 'transparent' },
)

const styleVars = computed(() => panelVars(props.variant, props.colors))
</script>

<template>
  <footer class="mw-footer" :class="`mw-footer--${variant}`" :style="styleVars">
    <div class="mw-footer__start"><slot name="start" /></div>
    <div class="mw-footer__center"><slot /></div>
    <div class="mw-footer__end"><slot name="end" /></div>
  </footer>
</template>

<style scoped>
.mw-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  background: var(--_bg);
  color: var(--_muted);
  border-top: 1px solid var(--_border);
  font-family: var(--mw-font-sans);
  font-size: 0.85rem;
}
.mw-footer--transparent {
  border-top: 1px solid var(--border);
}
.mw-footer__center {
  flex: 1 1 auto;
  min-width: 0;
}
.mw-footer__end {
  margin-left: auto;
}
</style>

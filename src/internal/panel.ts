import type { CSSProperties } from 'vue'

export type PanelVariant = 'light' | 'dark' | 'transparent'

/** Optional per-instance colour overrides (win over the token defaults). */
export interface PanelColors {
  bg?: string
  surface?: string
  text?: string
  muted?: string
  border?: string
}

/**
 * Resolve a panel variant to a set of local CSS variables (`--_bg`, `--_text`,
 * …) that the header/sidebar/footer styles consume. Variants use the
 * theme-INDEPENDENT `--mw-panel-*` tokens so a dark panel renders correctly on
 * a light page (and vice-versa). Transparent inherits the page text colour.
 * Any supplied `colors` override the defaults — token values are the default.
 */
export function panelVars(variant: PanelVariant, colors?: PanelColors): CSSProperties {
  let base: Record<string, string>
  if (variant === 'transparent') {
    base = {
      '--_bg': 'transparent',
      '--_surface': 'transparent',
      '--_text': 'var(--text)',
      '--_muted': 'var(--muted)',
      '--_border': 'transparent',
    }
  } else if (variant === 'light') {
    base = {
      '--_bg': 'var(--mw-panel-light-bg)',
      '--_surface': 'var(--mw-panel-light-surface)',
      '--_text': 'var(--mw-panel-light-text)',
      '--_muted': 'var(--mw-panel-light-muted)',
      '--_border': 'var(--mw-panel-light-border)',
    }
  } else {
    base = {
      '--_bg': 'var(--mw-panel-dark-bg)',
      '--_surface': 'var(--mw-panel-dark-surface)',
      '--_text': 'var(--mw-panel-dark-text)',
      '--_muted': 'var(--mw-panel-dark-muted)',
      '--_border': 'var(--mw-panel-dark-border)',
    }
  }
  if (colors) {
    if (colors.bg) base['--_bg'] = colors.bg
    if (colors.surface) base['--_surface'] = colors.surface
    if (colors.text) base['--_text'] = colors.text
    if (colors.muted) base['--_muted'] = colors.muted
    if (colors.border) base['--_border'] = colors.border
  }
  return base as CSSProperties
}

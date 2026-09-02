# Changelog

All notable changes to `@meddleware/ui` are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [Semantic Versioning](https://semver.org/).

## [0.1.3] - 2026-09-02

### Added

- `SidebarItem` component — navigation button for use inside `AppSidebar`. Accepts `label`, `icon`, `active`, and `disabled` props. Uses `--mw-radius` and `--accent` design tokens.

## [0.1.1] - 2026-08-27

### Fixed

- `dist/index.d.ts` declaration file now included in the published package. Vite's `emptyOutDir` was wiping vue-tsc's declaration output; fixed by disabling `emptyOutDir` in `vite.config.ts` and adding an explicit `rm -rf dist` at the start of the build script.
- CSS output renamed from `ui.css` to `base.css` — `assetFileNames` condition in `vite.config.ts` never matched Vite's internal lib-mode asset name.

## [0.1.0] - 2026-08-24

### Added

- Initial release: Vue 3 component library built on `@meddleware/design-tokens`.
- Layout shell: `AppHeader`, `AppSidebar`, `AppFooter`.
- Primitives: `UiButton`, `UiCard`, `UiSelect`, `UiNotice`.
- `ColorModeControl` component and `useColorMode` composable.
- Vite library build (ESM) with `vue-tsc` declaration output to `dist/`.

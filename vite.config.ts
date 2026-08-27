import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'MeddlewareUi',
      fileName: 'ui',
      formats: ['es'],
    },
    rollupOptions: {
      // Don't bundle Vue — consumers provide it as a peer dep
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        // Emit the base CSS alongside the JS bundle
        assetFileNames: () => 'base.css',
      },
    },
  },
})

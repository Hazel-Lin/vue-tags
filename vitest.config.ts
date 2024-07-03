import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import VueJSX from '@vitejs/plugin-vue-jsx'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  plugins: [vue(), VueJSX()],
  resolve: {
    alias: {
      '@': r('./src'),
    },
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['**/node_modules/**'],
    include: ['./**/*.test.{ts,js,tsx}'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})

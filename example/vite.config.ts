import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Uno from 'unocss/vite'

export default defineConfig({
  plugins: [vue(), Uno()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'vue-codemirror-merge-view': resolve(__dirname, '../src'),
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxInject: `import { h } from 'vue'`,
  },
})

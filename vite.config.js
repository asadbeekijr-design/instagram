import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Backend manzili: Render'da joylashgandan keyin VITE_API_URL orqali beriladi.
const BACKEND_URL = process.env.VITE_API_URL || 'http://localhost:5000'

// Render domeningiz — ikkala bo'limda ham ishlatiladi
const RENDER_HOST = 'instagram-nyfo.onrender.com'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    strictPort: true,
    allowedHosts: [RENDER_HOST], // dev server uchun
    proxy: {
      '/api': BACKEND_URL,
      '/socket.io': { target: BACKEND_URL, ws: true },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    strictPort: true,
    allowedHosts: [RENDER_HOST], // MUHIM: preview uchun alohida
  },
  build: {
    target: 'esnext',
  },
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Backend manzili: Render'da joylashgandan keyin VITE_API_URL orqali beriladi.
// Hozircha mahalliy ishlab chiqish uchun localhost:5000 saqlanadi.
const BACKEND_URL = process.env.VITE_API_URL || 'http://localhost:5000'

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
    // Render portni skanerlashi uchun barcha interfeyslarni tinglash shart
    host: '0.0.0.0',
    // Render avtomatik PORT beradi, mahalliy muhitda 5173 ishlatiladi
    port: process.env.PORT || 5173,
    strictPort: true,
    proxy: {
      '/api': BACKEND_URL,
      '/socket.io': { target: BACKEND_URL, ws: true },
    },
  },
  preview: {
    // `vite preview` uchun ham xuddi shu sozlamalar kerak
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    strictPort: true,
  },
  build: {
    target: 'esnext', // для top-level await в main.js
  },
})

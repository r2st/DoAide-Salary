import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3039,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://172.18.0.1:3038',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})

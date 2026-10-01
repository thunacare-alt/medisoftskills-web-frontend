import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/medisoftskills-web-frontend/',
  server: { host: '0.0.0.0', port: 8137 },
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false }
})

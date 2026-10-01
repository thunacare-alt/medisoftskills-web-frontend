import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Absolute base is required for GitHub project pages and for SPA deep links.
  base: '/medisoftskills-web-frontend/',

  server: { host: '0.0.0.0', port: 8137 },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: false,
    target: 'es2019',
    // Fonts and small icons stay inline/fetched lazily; only real code gets a chunk.
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        // Keep the entry tiny: React and the router cache separately, so a copy
        // tweak never invalidates the framework bundles.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'react'
          return 'vendor'
        }
      }
    }
  }
})

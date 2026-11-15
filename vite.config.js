import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'plus-jakarta-sans-latin-wght-normal.woff2') {
            return 'assets/plus-jakarta-sans-latin.woff2';
          }
          if (assetInfo.name === 'dm-sans-latin-wght-normal.woff2') {
            return 'assets/dm-sans-latin.woff2';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})

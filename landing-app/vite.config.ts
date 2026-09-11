import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // Avoid colliding with the repo's existing root /assets folder
    // (used by other live subsites: /cv, /bizlytics, etc.)
    assetsDir: 'app-assets',
  },
})

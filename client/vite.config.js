import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirect any request the frontend makes to /api
      '/api': {
        // To our backend server on port 3001
        target: 'http://localhost:3001',
        // Necessary for most configurations
        changeOrigin: true,
      },
    },
  },
})

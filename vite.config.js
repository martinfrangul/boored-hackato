import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/bored-api': {
        target: 'https://bored-api.appbrewery.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bored-api/, '')
      }
    }
  }
})

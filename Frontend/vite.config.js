import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'https://backend-omega-sooty-92.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    sass: {
      implementation: sass,
    },
  },
});

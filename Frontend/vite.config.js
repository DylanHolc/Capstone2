import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js'
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://capstone2backend.xyz',
        changeOrigin: true,
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

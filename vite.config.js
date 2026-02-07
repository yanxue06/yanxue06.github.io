import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages (use '/' for username.github.io)
  base: '/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Use standard sass implementation
        implementation: 'sass'
      }
    }
  },
  resolve: {
    // Prevent Node.js built-ins from being bundled
    browserField: true,
    mainFields: ['browser', 'module', 'main'],
    conditions: ['browser', 'default']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          ui: ['@chakra-ui/react'],
        },
      },
    },
    minify: 'esbuild',
  },
})
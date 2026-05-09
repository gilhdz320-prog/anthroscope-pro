import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@sections': path.resolve(__dirname, 'src/sections'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@data': path.resolve(__dirname, 'src/data'),
    },
  },
  build: {
    outDir: 'dist/public',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router'],
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-charts': ['recharts'],
        },
      },
    },
  },
})

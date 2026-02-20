import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'src/shared'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@theme': resolve(__dirname, 'src/theme'),
    },
  },
})

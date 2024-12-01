import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite Configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@material-tailwind/react': '/node_modules/@material-tailwind/react',
    },
  },
})

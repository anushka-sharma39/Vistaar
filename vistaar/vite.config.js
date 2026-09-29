import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173, strictPort: false, open: true },
  preview: { host: true, port: 4173 },
})

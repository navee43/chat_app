import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],


  server: {
    proxy: {
      "/api": "https://chat-app-backend-8vht.onrender.com/",
      // '/api':'http://localhost:5200'
      
    },
  },
})



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Expose Vercel's GEMINI_API_KEY to the client-side code as process.env.API_KEY
    // This is the standard way to access environment variables in a Vercel build.
    'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY)
  }
})

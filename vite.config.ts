import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Vercel provides the env variables directly.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      // Expose Vercel's GEMINI_API_KEY to the client-side code as process.env.API_KEY
      // JSON.stringify is crucial to wrap the key in quotes.
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    }
  }
})

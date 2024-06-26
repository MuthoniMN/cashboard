import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_CURRENCY_API_KEY': JSON.stringify(env.REACT_CURRENCY_API_KEY),
      'process.env.REACT_APP_CURRENCY_API_URL': JSON.stringify(env.REACT_APP_CURRENCY_API_URL),
      'process.env.REACT_APP_BACKEND_API': JSON.stringify(env.REACT_APP_BACKEND_API)
    },
    plugins: [react()],
  }
})
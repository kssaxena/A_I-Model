import { defineConfig , loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.MAIN_CONTACT_FORM_SERVICE_KEY": JSON.stringify(env.API_KEY),
    },
    plugins: [react()],
  };
});
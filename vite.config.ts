import { defineConfig } from 'vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
  ],
  base: '/',
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server: {
    port: 5174,
    open: true,
  },
})

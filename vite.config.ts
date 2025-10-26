import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://www.xfx365.com/buynowchina/dist/', // 使用相对路径
  server: {
    allowedHosts: [
      'www.letsfund.us',
      'letsfund.us'
    ],

    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

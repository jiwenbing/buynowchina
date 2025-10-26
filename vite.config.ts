import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 开发环境使用根路径，生产环境使用完整URL
  base: command === 'serve' ? '/' : 'https://www.xfx365.com/buynowchina/dist/',
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
}))

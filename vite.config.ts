import { defineConfig} from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
console.log('here')
export default defineConfig({
  plugins: [react()],

  base: '/react-ts-vite-book-city',

  // 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // 配置服务器
  server: {
    // 代理服务器
    proxy: {
      '/api': {
        target: 'http://106.14.223.52',
        changeOrigin: true,
      },
      '/public': {
        target: 'http://106.14.223.52',
        changeOrigin: true,
      },
    }
  }
})

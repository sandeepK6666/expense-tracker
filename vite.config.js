import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import path from 'path' // Import the path module

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  server: {
    port: 33 // Change the port number to 8080
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

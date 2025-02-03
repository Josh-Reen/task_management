import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Import the path module

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Add this line to alias '@' to the 'src' directory
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    strictPort: true,
    cors: true,
  },
});
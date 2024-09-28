import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Specify firebase-messaging-sw.js as a separate entry
        'firebase-messaging-sw': resolve(__dirname, 'firebase-messaging-sw.js'),
      },
    },
  },
});

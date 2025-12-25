
import { defineConfig } from 'vite';

// Объявляем process, чтобы tsc не ругался во время сборки
declare var process: any;

export default defineConfig({
  base: './', // Важно для GitHub Pages
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  server: {
    port: 3000
  }
});

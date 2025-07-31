import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Vite configuration for the DronHub project.  This file sets up
// the React plugin and configures an alias to simplify imports.  See
// https://vitejs.dev/config/ for more details.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
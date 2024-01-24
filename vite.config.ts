import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
const fed = () =>
  federation({
    name: 'mfe-basket',
    filename: 'remoteEntry.js',
    exposes: {
      './App': './src/RemoteApp',
    },
    remotes: {
      UI: 'https://rude-clouds.surge.sh/assets/remoteEntry.js',
    },
    shared: ['react', 'react-dom'],
  });

export default defineConfig({
  plugins: [react(), fed()],
  build: {
    target: 'esnext',
  },
});

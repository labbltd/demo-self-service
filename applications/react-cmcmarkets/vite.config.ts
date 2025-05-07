/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/applications/react-cmcmarkets',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  publicDir: 'src',
  build: {
    outDir: '../../dist/demo-self-service/react-cmcmarkets',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: "./src/webcomponent.tsx",
      name: "subscription",
      fileName: (format) => `cmcmarkets.${format}.js`,
    },
    target: "esnext"
  },
});

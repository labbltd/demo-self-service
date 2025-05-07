/// <reference types='vitest' />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: __dirname,
  base: '/demo-self-service/vue-hca/',
  cacheDir: '../../node_modules/.vite/applications/vue-hca',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    vue(), 
    nxViteTsPaths(),
    viteStaticCopy({
      targets: [
        {
          src: "../../node_modules/@pega/constellationjs/dist/bootstrap-shell.js",
          dest: "constellation"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/bootstrap-shell.*.*",
          dest: "constellation"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/lib_asset.json",
          dest: "constellation"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/constellation-core.*",
          dest: "constellation/prerequisite"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/constellation-core.*.*",
          dest: "constellation/prerequisite"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/js/*.*",
          dest: "constellation/prerequisite/js"
        }
      ]
    })
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/demo-self-service/vue-hca',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/applications/vue-hca',
      provider: 'v8',
    },
  },
});

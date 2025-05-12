import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/applications/react-labb',
  base: '/demo-self-service/',
  build: {
    outDir: '../../dist/demo-self-service/',
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  plugins: [
    react(),
    nxViteTsPaths(),
    viteStaticCopy({
      targets: [
        {
          src: "./public/css/fonts/*",
          dest: "./css/fonts"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/bootstrap-shell.*",
          dest: "./constellation"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/bootstrap-shell.*.*",
          dest: "./constellation"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/lib_asset.json",
          dest: "./constellation"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/constellation-core.*",
          dest: "./constellation/prerequisite"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/constellation-core.*.*",
          dest: "./constellation/prerequisite"
        },
        {
          src: "../../node_modules/@pega/constellationjs/dist/js/*.*",
          dest: "./constellation/prerequisite/js"
        }
      ]
    })
  ]
});

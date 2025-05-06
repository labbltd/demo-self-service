import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: '/demo-self-service',
  build: {
    outDir: './docs',
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  plugins: [
    react(),
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
        }
      ]
    })
  ]
});

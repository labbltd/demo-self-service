// applications/react-labb/vite.config.mts
import { defineConfig } from "file:///Users/danielwedema/git/labbltd/demo-self-service/node_modules/vite/dist/node/index.js";
import react from "file:///Users/danielwedema/git/labbltd/demo-self-service/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { viteStaticCopy } from "file:///Users/danielwedema/git/labbltd/demo-self-service/node_modules/vite-plugin-static-copy/dist/index.js";
import { nxViteTsPaths } from "file:///Users/danielwedema/git/labbltd/demo-self-service/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "/Users/danielwedema/git/labbltd/demo-self-service/applications/react-labb";
var vite_config_default = defineConfig({
  root: __vite_injected_original_dirname,
  cacheDir: "../../node_modules/.vite/applications/react-labb",
  base: "/demo-self-service/",
  build: {
    outDir: "../../dist/demo-self-service/"
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }]
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwbGljYXRpb25zL3JlYWN0LWxhYmIvdml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2RhbmllbHdlZGVtYS9naXQvbGFiYmx0ZC9kZW1vLXNlbGYtc2VydmljZS9hcHBsaWNhdGlvbnMvcmVhY3QtbGFiYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2RhbmllbHdlZGVtYS9naXQvbGFiYmx0ZC9kZW1vLXNlbGYtc2VydmljZS9hcHBsaWNhdGlvbnMvcmVhY3QtbGFiYi92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2RhbmllbHdlZGVtYS9naXQvbGFiYmx0ZC9kZW1vLXNlbGYtc2VydmljZS9hcHBsaWNhdGlvbnMvcmVhY3QtbGFiYi92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tIFwidml0ZS1wbHVnaW4tc3RhdGljLWNvcHlcIjtcbmltcG9ydCB7IG54Vml0ZVRzUGF0aHMgfSBmcm9tICdAbngvdml0ZS9wbHVnaW5zL254LXRzY29uZmlnLXBhdGhzLnBsdWdpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6IF9fZGlybmFtZSxcbiAgY2FjaGVEaXI6ICcuLi8uLi9ub2RlX21vZHVsZXMvLnZpdGUvYXBwbGljYXRpb25zL3JlYWN0LWxhYmInLFxuICBiYXNlOiAnL2RlbW8tc2VsZi1zZXJ2aWNlLycsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnLi4vLi4vZGlzdC9kZW1vLXNlbGYtc2VydmljZS8nLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFt7IGZpbmQ6IFwiQFwiLCByZXBsYWNlbWVudDogXCIvc3JjXCIgfV0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG54Vml0ZVRzUGF0aHMoKSxcbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiLi9wdWJsaWMvY3NzL2ZvbnRzLypcIixcbiAgICAgICAgICBkZXN0OiBcIi4vY3NzL2ZvbnRzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCIuLi8uLi9ub2RlX21vZHVsZXMvQHBlZ2EvY29uc3RlbGxhdGlvbmpzL2Rpc3QvYm9vdHN0cmFwLXNoZWxsLipcIixcbiAgICAgICAgICBkZXN0OiBcIi4vY29uc3RlbGxhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiLi4vLi4vbm9kZV9tb2R1bGVzL0BwZWdhL2NvbnN0ZWxsYXRpb25qcy9kaXN0L2Jvb3RzdHJhcC1zaGVsbC4qLipcIixcbiAgICAgICAgICBkZXN0OiBcIi4vY29uc3RlbGxhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiLi4vLi4vbm9kZV9tb2R1bGVzL0BwZWdhL2NvbnN0ZWxsYXRpb25qcy9kaXN0L2xpYl9hc3NldC5qc29uXCIsXG4gICAgICAgICAgZGVzdDogXCIuL2NvbnN0ZWxsYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcIi4uLy4uL25vZGVfbW9kdWxlcy9AcGVnYS9jb25zdGVsbGF0aW9uanMvZGlzdC9jb25zdGVsbGF0aW9uLWNvcmUuKlwiLFxuICAgICAgICAgIGRlc3Q6IFwiLi9jb25zdGVsbGF0aW9uL3ByZXJlcXVpc2l0ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiLi4vLi4vbm9kZV9tb2R1bGVzL0BwZWdhL2NvbnN0ZWxsYXRpb25qcy9kaXN0L2NvbnN0ZWxsYXRpb24tY29yZS4qLipcIixcbiAgICAgICAgICBkZXN0OiBcIi4vY29uc3RlbGxhdGlvbi9wcmVyZXF1aXNpdGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcIi4uLy4uL25vZGVfbW9kdWxlcy9AcGVnYS9jb25zdGVsbGF0aW9uanMvZGlzdC9qcy8qLipcIixcbiAgICAgICAgICBkZXN0OiBcIi4vY29uc3RlbGxhdGlvbi9wcmVyZXF1aXNpdGUvanNcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSlcbiAgXVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStZLFNBQVMsb0JBQW9CO0FBQzVhLE9BQU8sV0FBVztBQUNsQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLHFCQUFxQjtBQUg5QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTyxDQUFDLEVBQUUsTUFBTSxLQUFLLGFBQWEsT0FBTyxDQUFDO0FBQUEsRUFDNUM7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

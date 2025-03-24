import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: 'demo-self-service',
  plugins: [react()],
  build: {
    outDir: './docs'
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});

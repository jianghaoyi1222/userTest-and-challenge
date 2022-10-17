import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  base: "/embed_pages",
  build: {
    target: ["es2015"],
    emptyOutDir: true,
    outDir: resolve("../../dist/web-extension/embed_pages"),
  },
  server: {
    port: 9100,
    fs: { allow: ["../../"] },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      src: resolve(__dirname, "src"),
    },
  },
});

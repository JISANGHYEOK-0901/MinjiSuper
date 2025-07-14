import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          slider: ["react-slick", "slick-carousel"],
        },
      },
    },
    assetsInlineLimit: 4096, // 4KB 이하 이미지는 인라인
  },
  optimizeDeps: {
    include: ["react-slick", "slick-carousel"],
  },
});

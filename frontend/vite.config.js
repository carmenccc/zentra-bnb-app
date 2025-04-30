import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev environment proxy
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or '0.0.0.0'
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8800",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

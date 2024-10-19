import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/videos": "http://localhost:8000",
      "/tweet": "http://localhost:8000",
    },
  },
});

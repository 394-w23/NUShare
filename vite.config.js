import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
  },

  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});

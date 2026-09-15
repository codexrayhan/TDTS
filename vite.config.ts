import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import serverPlugin from "./server/middleware";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, ".", "");
  const defaultApiUrl = command === "serve" ? "/api" : "";

  return {
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL ?? defaultApiUrl),
    },
    plugins: [react(), tailwindcss(), serverPlugin()],
    resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "radix-vendor": [
              "@radix-ui/react-dialog",
              "@radix-ui/react-popover",
              "@radix-ui/react-select",
              "@radix-ui/react-tooltip",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-tabs",
              "@radix-ui/react-accordion",
              "@radix-ui/react-checkbox",
              "@radix-ui/react-switch",
              "@radix-ui/react-avatar",
            ],
            charts: ["recharts"],
            dnd: ["react-dnd", "react-dnd-html5-backend"],
            motion: ["motion"],
            calendar: ["react-day-picker", "date-fns"],
          },
        },
      },
    },
  };
});

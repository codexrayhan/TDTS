import type { Plugin } from "vite";

export default function serverPlugin(): Plugin {
  return {
    name: "tdts-api-middleware",
    apply: "serve",
    async configureServer(server) {
      const { app } = await import("./app");
      server.middlewares.use((req, res, next) => {
        const url = (req as { url?: string }).url || "";
        if (url.startsWith("/api")) return app(req as unknown as Parameters<typeof app>[0], res as unknown as Parameters<typeof app>[1], next as unknown as Parameters<typeof app>[2]);
        return next();
      });
    },
  };
}

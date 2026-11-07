import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Serves POST /api/assistant while you run `npm run dev`, using the very same
 * code that runs on Vercel (api/assistant.ts). Secrets stay on the server side:
 * they are read from .env here and never sent to the browser.
 */
function assistantDevApi(): Plugin {
  return {
    name: "shikhore-assistant-dev-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/assistant", async (req, res) => {
        const send = (status: number, body: unknown, headers: Record<string, string> = {}) => {
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "no-store");
          for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
          res.end(JSON.stringify(body));
        };

        try {
          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of req) {
            const buffer = chunk as Buffer;
            size += buffer.length;
            if (size > 200_000) {
              send(413, { error: { code: "REQUEST_TOO_LARGE", message: "That request is too large." } });
              return;
            }
            chunks.push(buffer);
          }
          const apiModule = await server.ssrLoadModule("/api/assistant.ts");
          const result = await apiModule.processAssistantRequest({
            method: req.method ?? "GET",
            body: Buffer.concat(chunks).toString("utf8"),
            ip: req.socket.remoteAddress ?? "local",
          });
          send(result.status, result.body, result.headers);
        } catch (error) {
          console.error("[usha] dev server error:", error instanceof Error ? error.message : error);
          send(500, { error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Make GEMINI_* values from .env visible to the dev API (server side only).
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of ["GEMINI_API_KEY", "GEMINI_MODEL"]) {
    if (env[key]) process.env[key] = env[key];
  }

  return {
    plugins: [react(), tailwindcss(), assistantDevApi()],
  };
});

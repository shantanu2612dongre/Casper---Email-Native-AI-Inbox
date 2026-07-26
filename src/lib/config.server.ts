import fs from "node:fs";
import path from "node:path";
import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
//
// On Cloudflare Workers, env binds at REQUEST time. Module-scope reads
// (e.g. `const x = process.env.X`) resolve to undefined — always read
// process.env INSIDE a function or handler.
//
// When to use which env-access pattern:
//   - .server.ts module (this file): server-only helpers reused across
//     handlers. Wrap reads in a function so they run per-request.
//   - inline process.env inside a createServerFn handler: one-off reads
//     not reused elsewhere.
//   - import.meta.env.VITE_FOO: PUBLIC config readable from both client
//     and server (analytics IDs, public URLs). Define in .env with the
//     VITE_ prefix. Never put secrets here — they ship to the browser.

export function loadServerEnv() {
  try {
    if (typeof process !== "undefined" && typeof process.loadEnvFile === "function") {
      const cwd = process.cwd();
      const envLocalPath = path.resolve(cwd, ".env.local");
      const envPath = path.resolve(cwd, ".env");
      if (fs.existsSync(envLocalPath)) {
        process.loadEnvFile(envLocalPath);
      }
      if (fs.existsSync(envPath)) {
        process.loadEnvFile(envPath);
      }
    }
  } catch (e) {
    // Ignore errors if already loaded or running in non-Node environments (like Cloudflare Workers)
  }
}

export function getServerConfig() {
  loadServerEnv();
  return {
    nodeEnv: process.env.NODE_ENV,
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}

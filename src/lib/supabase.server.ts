import { createClient } from "@supabase/supabase-js";
import process from "node:process";
import { loadServerEnv } from "./config.server";

// Server-only Supabase client using the service role key.
// The .server.ts suffix ensures this never reaches the browser bundle.
//
// Reads env vars inside a function (not module scope) so it works on
// Cloudflare Workers where env binds at request time.

export function getSupabaseAdmin() {
  loadServerEnv();
  const url =
    process.env.SUPABASE_URL ||
    import.meta.env?.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    import.meta.env?.VITE_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    import.meta.env?.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    import.meta.env?.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    const missing = [];
    if (!url) missing.push("SUPABASE_URL (or VITE_SUPABASE_URL)");
    if (!serviceKey)
      missing.push("SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_SERVICE_ROLE_KEY)");
    throw new Error(
      `Missing environment variable(s): ${missing.join(", ")}. Please check your .env.local file and RESTART 'npm run dev'!`,
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

import { createClient } from "@supabase/supabase-js";
import process from "node:process";

// Server-only Supabase client using the service role key.
// The .server.ts suffix ensures this never reaches the browser bundle.
//
// Reads env vars inside a function (not module scope) so it works on
// Cloudflare Workers where env binds at request time.

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

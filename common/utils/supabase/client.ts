import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SB_API_REST_URL!,
    process.env.NEXT_PUBLIC_SB_API_KEY!,
  );
}

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  console.log("++++", process.env.NEXT_PUBLIC_SB_API_REST_URL);
  console.log("++++", process.env.NEXT_PUBLIC_SB_API_KEY);

  return createServerClient(
    process.env.NEXT_PUBLIC_SB_API_REST_URL!,
    process.env.NEXT_PUBLIC_SB_API_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}

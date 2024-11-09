import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import { ApiConnection } from "@/interface/api";
import { ConnectionRepository } from "@/connections/interface/connectionRepository";
import { FeedbackRepository } from "@/feedback/interface/feedbackRepository";
import { MissionRepository } from "@/mission/interface/missionRepository";
import { UserProfileRepository } from "@/user/interface/userProfileRepository";

export async function createSSRClient(): Promise<ApiConnection> {
  const cookieStore = await cookies();
  const client = createServerClient(
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
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const repo = {
    userProfile: new UserProfileRepository(client),
    connection: new ConnectionRepository(client),
    mission: new MissionRepository(client),
    feedback: new FeedbackRepository(client),
  };

  return { client, repo };
}

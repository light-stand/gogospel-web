import { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

import { MissionRepository } from "@/mission/interface/missionRepository";
import { UserProfileRepository } from "@/user/interface/userProfileRepository";
import { ConnectionRepository } from "@/connections/interface/connectionRepository";
import { FeedbackRepository } from "@/feedback/interface/feedbackRepository";

export type ApiConnection = {
  client: SupabaseClient;
  repo: {
    userProfile: UserProfileRepository;
    mission: MissionRepository;
    connection: ConnectionRepository;
    feedback: FeedbackRepository;
  };
};

export const initializeApiConnection = () => {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SB_API_REST_URL!,
    process.env.NEXT_PUBLIC_SB_API_KEY!
  );

  const repo = {
    userProfile: new UserProfileRepository(client),
    connection: new ConnectionRepository(client),
    mission: new MissionRepository(client),
    feedback: new FeedbackRepository(client),
  };

  return { client, repo } as ApiConnection;
};

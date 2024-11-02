import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SB_API_REST_URL as string,
  process.env.NEXT_PUBLIC_SB_API_KEY as string
  // {
  //   auth: {
  //     storage: AsyncStorage,
  //     autoRefreshToken: true,
  //     persistSession: true,
  //     detectSessionInUrl: false,
  //   },
  // }
);

export enum SupabaseError {
  Duplicated = "23505",
}

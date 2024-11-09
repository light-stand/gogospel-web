import { useEffect } from "react";
import { supabase } from "@/common/interface/supabase";
import { useAuthStore } from "@/auth/store/useAuthStore";

export const useAuthInit = () => {
  const { setSession } = useAuthStore();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, [setSession]);
};

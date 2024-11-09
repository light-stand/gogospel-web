import { useEffect } from "react";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { ApiConnection } from "@/interface/api";

export const useAuthInit = ({ client }: ApiConnection) => {
  const { setSession } = useAuthStore();

  useEffect(() => {
    if (!client) return;
    client.auth.getSession().then(({ data: { session } }) => setSession(session));
    client.auth.onAuthStateChange((_event, session) => setSession(session));
  }, [setSession, client]);
};

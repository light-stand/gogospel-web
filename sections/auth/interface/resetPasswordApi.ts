import { ResetPassowordFields } from "@/auth/domain/ResetPassword";
import { ApiConnection } from "@/interface/api";

export const resetPassword =
  (client: ApiConnection["client"]) =>
  async ({ password }: ResetPassowordFields) => {
    if (typeof window === "undefined") return;

    const access_token = window.location.hash.split("access_token=")[1]?.split("&")[0];
    const refresh_token = window.location.hash.split("refresh_token=")[1]?.split("&")[0];

    const { error } = await client.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      console.error("Error setting session", error);
      return;
    }

    await client.auth.updateUser({ password });

    await client.auth.signOut();

    window.location.href = "/auth/login?password_reset"; // Trigger a full page reload
  };

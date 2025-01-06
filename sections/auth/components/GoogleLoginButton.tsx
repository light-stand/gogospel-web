"use client";
import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

import { useApi } from "@/common/context/ApiContext";

export const GoogleLoginButton = () => {
  const { client } = useApi();
  const clientRef = useRef(client);
  clientRef.current = client; // Update the ref whenever client changes
  const router = useRouter();

  const authWithGoogle = useCallback(
    async (credential: string) => {
      const currentClient = clientRef.current;
      if (!currentClient) {
        console.error("API client is not initialized");
        return;
      }

      const { data, error } = await currentClient.auth.signInWithIdToken({
        provider: "google",
        token: credential,
      });

      if (error) throw error;
      // Redirect to protected page
      router.push("/");
    },
    [router] // Removed client from dependencies
  );

  useEffect(() => {
    const handleSignInWithGoogle = (response: any) => {
      authWithGoogle(response.credential);
    };
    // Attach the handler to the window object
    (window as any).handleSignInWithGoogle = handleSignInWithGoogle;
  }, [authWithGoogle]);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive"></Script>
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
};

export default GoogleLoginButton;

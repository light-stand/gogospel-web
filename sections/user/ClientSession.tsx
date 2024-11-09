"use client";
import { useAuthStore } from "@/auth/store/useAuthStore";

export const ClientSession = () => {
  const { session } = useAuthStore();
  return (
    <>
      <h1 className="text-lg font-bold">Client session:</h1>
      <h1>{session?.user.email}</h1>
    </>
  );
};

"use client";
import { QueryClientProvider } from "react-query";

import { queryClient } from "@/interface/queryClient";
import { useAuthInit } from "@/auth/hooks/useAuthInit";
import { SidebarProvider } from "../components/ui/sidebar";
import { ModalProvider } from "./ModalContext";

import "@/utils/date.ts";

export default function Providers({ children }: { children: React.ReactNode }) {
  useAuthInit();
  return (
    <SidebarProvider className="w-full">
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ModalProvider>
    </SidebarProvider>
  );
}

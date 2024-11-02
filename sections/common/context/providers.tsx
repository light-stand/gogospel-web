"use client";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/interface/queryClient";
import { SidebarProvider } from "../components/ui/sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="w-full">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SidebarProvider>
  );
}

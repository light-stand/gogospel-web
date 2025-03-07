"use client";
import { QueryClient, QueryClientProvider } from "react-query";

import { SidebarProvider } from "../components/ui/sidebar";
import { ModalProvider } from "./ModalContext";
import { ApiClientProvider } from "@/common/context/ApiContext";

import "@/utils/date.ts";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { keepPreviousData: true } } });

  return (
    <ApiClientProvider>
      <SidebarProvider className="w-full h-full">
        <QueryClientProvider client={queryClient}>
          <ModalProvider>{children}</ModalProvider>
        </QueryClientProvider>
      </SidebarProvider>
    </ApiClientProvider>
  );
}

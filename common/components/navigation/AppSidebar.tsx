"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "@/assets/logo.svg";
import { useModal } from "@/context/ModalContext";
import { navigationOptions } from "@/navigation/domain/NavigationOptions";
import { Icon } from "../ui";
import { useAuthStore } from "@/auth/store/useAuthStore";

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenModal } = useModal();
  const t = useTranslations();
  const router = useRouter();
  const { session } = useAuthStore();

  const onOptionClick = async (url: (typeof navigationOptions)[number]["url"]) => {
    return session?.user || url === "/explore" ? router.push(url) : setOpenModal("auth");
  };

  return (
    <Sidebar className="z-20">
      <SidebarContent>
        <SidebarHeader>
          <Image src={logo} alt="Logo" className="w-10 h-10 mx-auto mt-2" />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationOptions.map((item) => {
                const isActive = pathname.includes(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="flex-col h-14">
                      <button onClick={() => onOptionClick(item.url)} className="gap-y-1">
                        <Icon
                          name={isActive ? item.activeIcon : item.icon}
                          size={0.85}
                          className={clsx(isActive ? "text-indigo-500" : "text-neutral-500")}
                        />
                        <span
                          className={clsx(
                            isActive ? "text-indigo-500" : "text-neutral-500",
                            "text-xs font-bold"
                          )}
                        >
                          {t(item.title)}
                        </span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

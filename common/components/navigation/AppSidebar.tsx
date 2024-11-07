"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Icon from "@mdi/react";

import {
  mdiAccount,
  mdiAccountOutline,
  mdiChat,
  mdiChatOutline,
  mdiCompass,
  mdiCompassOutline,
  mdiHandshake,
  mdiHandshakeOutline,
} from "@mdi/js";

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

const items = [
  {
    title: "Explore",
    url: "/explore",
    icon: mdiCompassOutline,
    activeIcon: mdiCompass,
  },
  {
    title: "Connections",
    url: "/connections",
    icon: mdiChatOutline,
    activeIcon: mdiChat,
  },
  {
    title: "Mission",
    url: "/missions",
    icon: mdiHandshakeOutline,
    activeIcon: mdiHandshake,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: mdiAccountOutline,
    activeIcon: mdiAccount,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Image src={logo} alt="Logo" className="w-10 h-10 mx-auto mt-2" />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="flex-col h-14">
                      <a href={item.url} className="gap-y-1">
                        <Icon
                          path={isActive ? item.activeIcon : item.icon}
                          size={0.85}
                          className={clsx(isActive ? "text-indigo-500" : "text-neutral-500")}
                        />
                        <span
                          className={clsx(
                            isActive ? "text-indigo-500" : "text-neutral-500",
                            "text-xs font-bold"
                          )}
                        >
                          {item.title}
                        </span>
                      </a>
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

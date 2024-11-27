import React from "react";
import { MissionMap } from "@/mission/components/MissionMap";

export default function Explore({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-full flex-1">
      {children}
      <div className="flex-1 absolute md:relative w-full">
        <MissionMap />
      </div>
    </div>
  );
}

import React from "react";
import { MissionMap } from "@/mission/components/MissionMap";

export default function Explore({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      {children}
      <div className="flex-1">
        <MissionMap />
      </div>
    </div>
  );
}

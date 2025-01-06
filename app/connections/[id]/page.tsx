"use client";

import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/connections/components/Chat"), { ssr: false });

export default function Connections({ params: { id } }: { params: { id: string } }) {
  const connectionId = parseInt(id);
  if (!connectionId) return null;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Chat connectionId={connectionId} />
    </div>
  );
}

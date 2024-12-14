"use server";
import NoResults from "@/components/ui/feedback/NoResults";
import { createSSRClient } from "@/interface/apiSSR";
import { ConnectionListItem } from "./ConnectionListItem";

export const ConnectionList = async () => {
  const { client, repo } = await createSSRClient();
  const user = (await client.auth.getUser()).data.user;
  const connections = await repo?.connection.getForUser(user?.id);

  return (
    <div>
      {connections.length > 0 &&
        connections.map((connection) => (
          <ConnectionListItem key={connection.id} connection={connection} />
        ))}
      {connections.length === 0 && (
        <NoResults type="connections" className="p-4 max-w-sm mx-auto" />
      )}
    </div>
  );
};

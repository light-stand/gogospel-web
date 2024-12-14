"use server";
import NoResults from "@/components/ui/feedback/NoResults";

export default async function Connections() {
  return (
    <div className="p-4 m-auto">
      <NoResults type="selectChat" />
    </div>
  );
}

import { redirect } from "next/navigation";
import { createSSRClient } from "@/interface/apiSSR";
import { ProfileClientPage } from "./ProfileClientPage";
import { handleDelete, updateProfile } from "./actions";

export default async function Profile() {
  const { client, repo } = await createSSRClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const [profile, opportunities] = await Promise.all([
    repo.userProfile.get(["user_id", "eq", user.id]).then((res) => res[0]),
    repo.mission.get(["created_by", "eq", user.id]),
  ]);

  if (!profile) {
    // Maybe create a profile if it doesn't exist
    return redirect("/");
  }
  const updateProfileWithId = updateProfile.bind(null, profile.id);

  return (
    <ProfileClientPage
      user={user}
      profile={profile}
      opportunities={opportunities}
      updateProfile={updateProfileWithId}
      handleDelete={handleDelete}
    />
  );
}

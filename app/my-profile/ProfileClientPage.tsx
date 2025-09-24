"use client";
import { EditProfileForm } from "@/sections/user/components/EditProfileForm";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui";
import { UserProfile } from "@/user/domain/User";
import { Mission } from "@/mission/domain/Mission";
import { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";

export function ProfileClientPage({
  user,
  profile,
  opportunities,
  updateProfile,
  handleDelete,
}: {
  user: User;
  profile: UserProfile;
  opportunities: Mission[];
  updateProfile: (values: { name: string }) => Promise<void>;
  handleDelete: (opportunityId: string) => Promise<void>;
}) {
  const t = useTranslations();
  return (
    <div className="flex flex-col max-w-screen-sm mx-auto px-4 w-full py-8">
      <h2 className="text-2xl font-bold mb-4">{t("screen.profile")}</h2>

      <EditProfileForm
        email={user.email || ""}
        name={profile.name}
        updateProfile={updateProfile}
      />

      <div className="mt-12 flex flex-col gap-y-3">
        <h2 className="text-2xl font-bold mb-4">
          {t("user.profile.myMissions")}
        </h2>
        {opportunities.length > 0 ? (
          opportunities.map((mission) => (
            <div key={mission.id} className="flex items-center">
              <div className="mr-4 flex-1">
                <h3 className="font-bold">{mission.title}</h3>
              </div>
              <Button
                variant="link"
                className="text-red-600"
                onClick={() => handleDelete(mission.id.toString())}
              >
                <Icon name="delete" />
                {t("mission.delete.confirm")}
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{t("noResults.myMissions.title")}</p>
        )}
      </div>
    </div>
  );
}

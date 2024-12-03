"use client";
import { UseFormReturn } from "react-hook-form";

import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";
import { MissionSheetTitle } from "../../MissionSheet/partials/MissionSheetTitle";
import { MissionSheetCarousel } from "../../MissionSheet/partials/MissionSheetCarousel";
import { MissionSheetInfo } from "../../MissionSheet/partials/MissionSheetInfo";
import { Mission } from "@/mission/domain/Mission";
import { useUserProfile } from "@/user/application/useUserProfile";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Summary = ({ form }: { form: UseFormReturn<MissionCreationFields> }) => {
  const {
    title,
    description,
    startDate,
    duration,
    durationMultiplier,
    noDuration,
    noStartDate,
    categories,
    image,
    location,
  } = form.getValues();
  const profile = useUserProfile();
  const t = useTranslations();

  const mission: Mission = {
    id: 1,
    title,
    description,
    start_date: noStartDate ? null : startDate,
    duration: noDuration || !duration ? null : duration * durationMultiplier,
    categories,
    created_by: profile.user_id,
    ...(image && { images: Array.isArray(image) ? image : [image] }),
    user_profile: profile,
    location_name: location?.locationName,
    // distance: Math.floor(distance),
  };

  return (
    <div className="w-[32rem] mx-auto">
      <h1 className="font-bold text-3xl mb-4 text-center">
        {t("mission.creation.titles.summary")}
      </h1>
      <Image
        src={require("@/assets/images/illustration/celebration.png")}
        className="mx-auto"
        width={400}
        height={400}
        alt="Mission summary"
      />
      <span className="text-neutral-500 font-bold my-2 text-center">
        {t("mission.creation.helper.summary")}
      </span>
      <div className="h-[1px]  border-b border-neutral-300 my-4" />
      <MissionSheetTitle mission={mission} />
      <MissionSheetCarousel mission={mission} />
      <MissionSheetInfo mission={mission} />
    </div>
  );
};

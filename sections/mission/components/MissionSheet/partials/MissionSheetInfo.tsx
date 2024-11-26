import { capitalize } from "lodash";
import dayjs from "@/utils/date";
import { useTranslations } from "next-intl";

import { Icon, TagCloud, MaterialIconType } from "@/components/ui";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";

type MissionSheetInfoProps = {
  mission?: Mission;
};

export const MissionSheetInfo = ({ mission }: MissionSheetInfoProps) => {
  const t = useTranslations();

  const info = [
    mission?.start_date && {
      icon: "calendar",
      text: dayjs(mission?.start_date as Date).format("DD/MM/YYYY"),
    },
    mission?.duration && {
      icon: "clock-time-eight-outline",
      text: capitalize(dayjs.duration(mission?.duration as number, "days").humanize()),
    },
    { icon: "map-marker", text: mission?.location_name },
    mission?.distance && {
      icon: "map-marker-distance",
      text: t("maps.distance", { distance: mission?.distance }),
    },
  ].filter(Boolean) as { icon: MaterialIconType; text: string }[];

  return (
    <>
      <TagCloud
        className="w-full my-2"
        allSelected
        options={(mission?.categories || []).map((category) => ({
          label: t(`mission.types.${category}`),
          value: category,
          color: missionTypes[category].color,
          icon: missionTypes[category].icon,
        }))}
      />

      <div className="flex flex-row flex-wrap items-center gap-y-2">
        {info.map((item) => (
          <div key={item.icon} className="flex w-1/2 flex-row items-center px-1">
            <Icon name={item.icon} className="text-lg text-neutral-500 mr-1" size={0.8} />
            <span className="flex-1 text-base font-semibold text-neutral-500 line-clamp-1">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <p className="text-base text-neutral-400 my-4 w-full break-words">{mission?.description}</p>
    </>
  );
};

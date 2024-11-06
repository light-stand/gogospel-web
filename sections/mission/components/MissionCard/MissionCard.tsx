import React, { useEffect } from "react";
import { capitalize } from "lodash";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/es";

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);

// import { Icon, Image, TagCloud } from "@/components";
import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";
// import { useTranslation } from "react-i18next";
// import { getLocation } from "@/maps/utils/location";
import { haversineDistance } from "@/maps/utils/distance";
import clsx from "clsx";
import { redirect } from "next/navigation";
import Image from "next/image";
import { TagCloud } from "@/common/components/ui/forms/TagCloud";
import { Icon } from "@/common/components/ui";

export interface MissionCardProps {
  mission: Mission;
  style?: object;
  className?: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, className }) => {
  // const { t } = useTranslation();
  const t = (key: string, a?: any) => key;

  const [distance, setDistance] = React.useState<number | null>(null);

  const onCardPress = () => {
    redirect(`/mission/${mission.id}`);
  };

  // const getMissionDistance = async () => {
  //   const userLocation = await getLocation();
  //   if (!userLocation || !mission.lat || !mission.long) return;
  //   const distance = haversineDistance(
  //     userLocation?.latitude,
  //     userLocation?.longitude,
  //     mission.lat,
  //     mission.long
  //   );
  //   setDistance(Math.floor(distance));
  // };

  // useEffect(() => {
  //   getMissionDistance();
  // }, []);

  if (!mission.id) return null;

  const { title, categories, duration, images, user_profile, approved } = mission;

  return (
    <div
      className={clsx(
        "w-[16rem] relative h-[16rem]",
        "flex justify-between gap-x-2",
        "bg-white shadow-md rounded-lg overflow-hidden",
        className
      )}
      onClick={onCardPress}
    >
      <div className="absolute aspect-square rounded-2xl">
        <Image
          src={(images ? images[0] : user_profile?.images[0]) || ""}
          className="flex-1 object-cover w-full h-full"
          alt="Mission"
          height={200}
          width={200}
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute bottom-0 p-2 flex flex-col justify-end z-10 w-full bg-white flex-0">
        <span className="text-lg font-bold line-clamp-1">{title}</span>
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center">
            <Icon name="church" className="mr-2 text-neutral-500 text-base" size={0.6} />
            <span className="text-neutral-500 font-bold w-full line-clamp-1 text-sm">
              {user_profile?.name}
            </span>
          </div>

          <div className="flex flex-row items-center gap-x-1">
            {duration && (
              <>
                <Icon name="clock" className="text-neutral-500 text-base" size={0.6} />
                <span className="text-sm text-neutral-500 font-bold line-clamp-1">
                  {capitalize(dayjs.duration(duration, "days").humanize())}
                </span>
              </>
            )}
            <Icon name="map-marker" className="text-neutral-500 text-base" size={0.6} />
            <span className="text-sm text-neutral-500 font-bold">
              {t("maps.distance", { distance })}
            </span>
          </div>
          {/* {start_date && end_date && (
                <div className="flex flex-row items-center">
                  <Icon name="clock" className="mr-2 text-neutral-500 text-base" />
                  <span className="text-md text-neutral-500 font-bold">
                    {dayjs.duration(dayjs(end_date).diff(start_date)).humanize()}
                  </span>
                </div>
              )} */}
        </div>
        <TagCloud
          compact
          allSelected
          noWrap
          className="w-full h-5 overflow-y-hidden overflow-x-scroll no-scrollbar"
          options={categories.map((category) => ({
            label: t(`mission.types.${category}`),
            value: category,
            color: missionTypes[category].color,
            icon: missionTypes[category].icon,
          }))}
        />
        {/* <div className="flex flex-row items-center">
              <Icon name="calendar-month" className="mr-2 text-neutral-500 text-base" />
              <span className="text-md text-neutral-500 font-bold">
                {dayjs(start_date).format("D MMM")} - {dayjs(end_date).format("D MMM")}
              </span>
            </div> */}
        {/* {!approved && (
              <Icon
                name="clock-outline"
                className="absolute right-0 top-1/2 -mt-4 text-3xl text-neutral-400"
              />
            )} */}
      </div>
    </div>
  );
};
export default MissionCard;

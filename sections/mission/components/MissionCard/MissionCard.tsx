import React from "react";
import { capitalize } from "lodash";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import Image from "next/image";
import dayjs from "@/utils/date";

import { Icon, TagCloud } from "@/components/ui";

import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";

export interface MissionCardProps {
  mission: Mission;
  style?: object;
  className?: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, className }) => {
  const t = useTranslations();

  if (!mission.id) return null;

  const { title, images, user_profile } = mission;

  return (
    <div
      className={clsx(
        "relative",
        "flex items-center justify-between gap-x-2",
        "bg-white shadow-md overflow-hidden",
        "rounded-xl",
        "border border-gray-200",
        "p-2",
        className,
      )}
    >
      <Image
        src={(images && images[0] ? images[0] : user_profile?.images[0]) || ""}
        className="flex-1 object-cover aspect-square rounded-md h-[122px] w-[122px]"
        alt="Mission"
        height={122}
        width={122}
      />
      <span className="p-4 flex flex-col z-10 w-full bg-white">
        {/*<span className="text-sm text-neutral-500 font-bold line-clamp-1">
          {t("mission.explore.imLookingFor")}
        </span>*/}
        <span className="text-2xl font-bold line-clamp-1">{title}</span>
        <span className="w-full flex text-neutral-500 flex-col gap-x-1">
          <div className="flex flex-row items-center gap-x-1 text-nowrap">
            <Icon name="account" size={0.8} />
            {user_profile?.name}
          </div>

          <div className="flex flex-row items-center gap-x-1 text-nowrap">
            {/*{duration && (
              <>
                <Icon name="clock" className="text-neutral-500" size={0.6} />
                <span className="text-sm text-neutral-500 line-clamp-1">
                  {capitalize(dayjs.duration(duration, "days").humanize())}
                </span>
              </>
            )}*/}
            <Icon name="map-marker" size={0.8} />
            {/*{t("maps.distance", { distance })}*/}
            {mission.location_name}
          </div>
          {/* {start_date && end_date && (
                <div className="flex flex-row items-center">
                  <Icon name="clock" className="mr-2 text-neutral-500 text-base" />
                  <span className="text-md text-neutral-500 font-bold">
                    {dayjs.duration(dayjs(end_date).diff(start_date)).humanize()}
                  </span>
                </div>
              )} */}
        </span>
        {/*<TagCloud
          compact
          allSelected
          // noWrap
          className="w-full h-11 overflow-y-hidden overflow-x-scroll no-scrollbar"
          options={categories.map((category) => ({
            label: t(`mission.types.${category}`),
            value: category,
            color: missionTypes[category].color,
            icon: missionTypes[category].icon,
          }))}
        />*/}
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
      </span>
    </div>
  );
};
export default MissionCard;

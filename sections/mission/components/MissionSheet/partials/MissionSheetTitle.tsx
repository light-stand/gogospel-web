import Link from "next/link";

import { Mission } from "@/mission/domain/Mission";

type MissionSheetTitleProps = {
  mission?: Mission;
};

export const MissionSheetTitle = ({ mission }: MissionSheetTitleProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-1 line-clamp-1">{mission?.title}</h1>
      <div className="flex-row items-center w-full mb-3 overflow-hidden">
        <Link href={`/profile/${mission?.user_profile?.user_id}`}>
          <div className="flex flex-row items-center w-full overflow-hidden ">
            {/* <UserPhoto source={{ uri: user_profile?.images[0] }} className="h-6 w-6 mr-2" /> */}
            <span className="text-base text-neutral-500 font-bold line-clamp-1">
              {mission?.user_profile?.name}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

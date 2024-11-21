import clsx from "clsx";
import Link from "next/link";

import MissionCard from "../MissionCard/MissionCard";
import { Mission } from "@/mission/domain/Mission";

interface MissionListProps {
  missions: Mission[];
  isLoading?: boolean;
  className?: string;
  NoResultsComponent?: () => JSX.Element;
  onPlanSelected?: (index: number) => void;
}

const MissionList: React.FC<MissionListProps> = ({
  missions,
  NoResultsComponent,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        missions.length > 0 && "grid-cols-[repeat(auto-fill,minmax(240px,2fr))] grid gap-4",
        "pb-8 px-1 justify-center items-center",
        "overflow-y-overlay overflow-x-hidden",
        className
      )}
    >
      {missions.length === 0 && NoResultsComponent ? (
        <NoResultsComponent />
      ) : (
        missions.map((mission) => (
          <Link
            href={`/mission/${mission.id}`}
            className="hover:opacity-80 w-full"
            key={mission.id}
          >
            <MissionCard mission={mission} />
          </Link>
        ))
      )}
    </div>
  );
};

export default MissionList;

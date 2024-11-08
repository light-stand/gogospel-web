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
  isLoading,
  NoResultsComponent,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-2 gap-2 pb-8 px-4",
        "overflow-y-overlay overflow-x-hidden",
        className
      )}
    >
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : missions.length === 0 && NoResultsComponent ? (
        <NoResultsComponent />
      ) : (
        missions.map((mission) => (
          <Link href={`/mission/${mission.id}`} className="hover:opacity-80">
            <MissionCard mission={mission} key={mission.id} />
          </Link>
        ))
      )}
    </div>
  );
};

export default MissionList;

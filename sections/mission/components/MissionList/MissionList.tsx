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
        missions.length > 0 && "gap-4",
        "flex flex-col justify-center items-center",
        className,
      )}
    >
      {missions.length === 0 && NoResultsComponent ? (
        <NoResultsComponent />
      ) : (
        missions.map((mission) => (
          <Link
            href={`/${mission.id}`}
            className="hover:opacity-80 hover:shadow-md transition w-full"
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

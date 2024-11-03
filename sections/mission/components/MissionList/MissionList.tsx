import clsx from "clsx";
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
    <div className={clsx("flex overflow-scroll max-h-screen no-scrollbar", className)}>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : missions.length === 0 && NoResultsComponent ? (
        <NoResultsComponent />
      ) : (
        missions.map((mission) => <MissionCard mission={mission} key={mission.id} />)
      )}
    </div>
  );
};

export default MissionList;

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "../button";
import Image from "next/image";

type NoResultsType =
  | "myMissions"
  | "favorites"
  | "involved"
  | "connections"
  | "feedbackReceived"
  | "feedbackGiven";

type NoResultsProps = {
  type: NoResultsType;
  className?: string;
};

const noResultsIllustration = {
  myMissions: require("@/assets/images/illustration/fitting.png"),
  favorites: require("@/assets/images/illustration/favorite.png"),
  involved: require("@/assets/images/illustration/collab.png"),
  connections: require("@/assets/images/illustration/chatting.png"),
  feedbackReceived: require("@/assets/images/illustration/feedback.png"),
  feedbackGiven: require("@/assets/images/illustration/feedback2.png"),
};

const noResultsLinks: Partial<Record<NoResultsType, string>> = {
  myMissions: "/missions/create/start",
};

export const NoResults = async ({ type, ...props }: NoResultsProps) => {
  const t = await getTranslations();

  return (
    <div className="flex flex-col px-2" {...props}>
      <Image
        src={noResultsIllustration[type]}
        className="w-full aspect-[1.6] mt-8 object-contain"
        alt="No results illustration"
        width={300}
        height={300}
      />
      <div className="flex flex-col px-4 items-center">
        <span className="text-neutral-800 text-xl font-bold mt-2 mb-auto text-center">
          {t(`noResults.${type}.title`)}
        </span>
        <span className="text-neutral-500 font-bold mt-2 mb-auto text-center">
          {t(`noResults.${type}.text`)}
        </span>
        {noResultsLinks[type] && (
          <Link className="px-4 mt-4" href={noResultsLinks[type]}>
            <Button>{t(`noResults.${type}.button`)}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NoResults;

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { Mission } from "@/mission/domain/Mission";

type MissionSheetCarouselProps = {
  mission?: Mission;
};

export const MissionSheetCarousel = ({ mission }: MissionSheetCarouselProps) => {
  const [ref, api] = useEmblaCarousel({});

  return (
    <section className="w-full aspect-video bg-neutral-200 overflow-hidden rounded-xl">
      {mission?.images && (
        <div className="h-full" ref={ref}>
          <div className="h-full">
            {mission?.images?.map((url) => (
              <div className="" key={url}>
                <Image src={url} alt={mission?.title} className="h-full" fill objectFit="cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

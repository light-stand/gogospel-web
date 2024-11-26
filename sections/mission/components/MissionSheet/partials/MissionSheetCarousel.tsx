"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { Mission } from "@/mission/domain/Mission";

type MissionSheetCarouselProps = {
  mission?: Mission;
};

export const MissionSheetCarousel = ({ mission }: MissionSheetCarouselProps) => {
  const [ref, api] = useEmblaCarousel({});

  const images =
    (mission?.images && mission?.images?.length > 0
      ? mission?.images
      : mission?.user_profile?.images) || [];

  console.log(images);
  return (
    <section className="w-full aspect-video bg-neutral-200 overflow-hidden rounded-xl">
      <div className="h-full" ref={ref}>
        <div className="h-full">
          {images.map((url) => (
            <div className="relative h-full w-full" key={url}>
              <Image
                src={url}
                alt={mission?.title || ""}
                className="h-full object-cover w-full"
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

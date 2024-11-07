import colors from "tailwindcss/colors";

import { Mission } from "@/mission/domain/Mission";
import { icons } from "@/components/ui";
import { missionTypes } from "@/mission/domain/MissionType";

/**
 * Create a data:image SVG to use as marker
 *
 * (Messy) workaround to allow MDI icons into Google Maps marker
 */
export const generateIcon = (mission: Mission) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-8 -8 48 48">
      <circle cx="16" cy="16" r="20" 
        fill="${colors[missionTypes[mission?.categories[0]].color][500]}" 
        stroke="${colors[missionTypes[mission?.categories[0]].color][600]}"
        stroke-width="3px"
        />
      <path d="${
        icons[missionTypes[mission?.categories[0]].icon]
      }" transform="translate(4, 4)" fill="white" />
    </svg>`
  )}`;

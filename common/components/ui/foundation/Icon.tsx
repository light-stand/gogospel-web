import MdiIcon from "@mdi/react";

import {
  mdiAccount,
  mdiAccountOutline,
  mdiChat,
  mdiChatOutline,
  mdiCompass,
  mdiCompassOutline,
  mdiHandshake,
  mdiHandshakeOutline,
  mdiFlask,
  mdiHandCoinOutline,
  mdiHandHeart,
  mdiAccountGroup,
  mdiAccountTie,
  mdiBabyFaceOutline,
  mdiBook,
  mdiBriefcase,
  mdiBullhorn,
  mdiCamera,
  mdiCity,
  mdiCityVariant,
  mdiDramaMasks,
  mdiEarth,
  mdiFlare,
  mdiGavel,
  mdiHeadHeart,
  mdiHiking,
  mdiHospital,
  mdiHumanChild,
  mdiHumanMaleFemale,
  mdiLaptop,
  mdiLeaf,
  mdiMusic,
  mdiPalette,
  mdiPencil,
  mdiPencilRuler,
  mdiScaleBalance,
  mdiSchool,
  mdiSoccer,
  mdiTelevision,
  mdiVideo,
  mdiChurch,
  mdiClock,
  mdiMapMarker,
  mdiChevronLeft,
  mdiCalendar,
  mdiMapMarkerDistance,
  mdiClockTimeEightOutline,
  mdiCurrencyUsd,
  mdiHeart,
  mdiHeartOutline,
  mdiCheck,
  mdiDomain,
  mdiCharity,
  mdiRadio,
  mdiAccountMultiple,
  mdiBookOpen,
  mdiMusicNote,
  mdiStorefront,
  mdiLibrary,
  mdiCross,
  mdiCheckDecagram,
  mdiChevronRight,
  mdiCommentCheckOutline,
  mdiLockCheckOutline,
  mdiLogout,
  mdiBell,
} from "@mdi/js";

export const icons = {
  account: mdiAccount,
  "account-outline": mdiAccountOutline,
  chat: mdiChat,
  "chat-outline": mdiChatOutline,
  compass: mdiCompass,
  "compass-outline": mdiCompassOutline,
  handshake: mdiHandshake,
  "handshake-outline": mdiHandshakeOutline,
  flask: mdiFlask,
  "hand-coin-outline": mdiHandCoinOutline,
  "hand-heart": mdiHandHeart,
  "account-group": mdiAccountGroup,
  "account-tie": mdiAccountTie,
  "baby-face-outline": mdiBabyFaceOutline,
  book: mdiBook,
  briefcase: mdiBriefcase,
  bullhorn: mdiBullhorn,
  camera: mdiCamera,
  city: mdiCity,
  "city-variant": mdiCityVariant,
  "drama-masks": mdiDramaMasks,
  earth: mdiEarth,
  flare: mdiFlare,
  gavel: mdiGavel,
  "hand-coin": mdiHandCoinOutline,
  "head-heart": mdiHeadHeart,
  hiking: mdiHiking,
  hospital: mdiHospital,
  "human-child": mdiHumanChild,
  "human-male-female": mdiHumanMaleFemale,
  laptop: mdiLaptop,
  leaf: mdiLeaf,
  music: mdiMusic,
  palette: mdiPalette,
  pencil: mdiPencil,
  "pencil-ruler": mdiPencilRuler,
  "scale-balance": mdiScaleBalance,
  school: mdiSchool,
  soccer: mdiSoccer,
  television: mdiTelevision,
  video: mdiVideo,
  church: mdiChurch,
  clock: mdiClock,
  "map-marker": mdiMapMarker,
  "chevron-left": mdiChevronLeft,
  calendar: mdiCalendar,
  "map-marker-distance": mdiMapMarkerDistance,
  "clock-time-eight-outline": mdiClockTimeEightOutline,
  "currency-usd": mdiCurrencyUsd,
  heart: mdiHeart,
  "heart-outline": mdiHeartOutline,
  check: mdiCheck,
  domain: mdiDomain,
  charity: mdiCharity,
  radio: mdiRadio,
  "account-multiple": mdiAccountMultiple,
  "book-open": mdiBookOpen,
  "music-note": mdiMusicNote,
  storefront: mdiStorefront,
  library: mdiLibrary,
  cross: mdiCross,
  "check-decagram": mdiCheckDecagram,
  "chevron-right": mdiChevronRight,
  "comment-check-outline": mdiCommentCheckOutline,
  bell: mdiBell,
  logout: mdiLogout,
  "lock-check-outline": mdiLockCheckOutline,
};

export type MaterialIconType = keyof typeof icons | null;

interface IconProps extends Omit<React.ComponentProps<typeof MdiIcon>, "path"> {
  name: MaterialIconType;
}

export const Icon = ({ name, ...props }: IconProps) =>
  name && <MdiIcon {...props} path={icons[name]} />;

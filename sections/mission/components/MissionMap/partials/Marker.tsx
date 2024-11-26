"use client";
import { Marker as GMarker } from "@react-google-maps/api";
import colors from "tailwindcss/colors";
import { useRouter } from "next/navigation";

import { Mission } from "@/mission/domain/Mission";
import { missionTypes } from "@/mission/domain/MissionType";
// import ClusterMarker from "./ClusterMarker";
import { generateIcon } from "../utils/generateSvgIcon";

export const Marker = ({
  marker,
  mission,
  onPress,
}: {
  marker?: any;
  mission: Mission;
  onPress?: (id: string) => void;
}) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/mission/${mission.id}`);
  };
  // const key = marker.properties.id || marker.geometry.coordinates[0];
  return (
    <GMarker
      clickable
      onClick={onClick}
      shape={{
        type: "circle",
        coords: [0, 0, 24],
      }}
      icon={{
        url: generateIcon(mission),
        anchor: { x: 12, y: 16, equals: () => true },
      }}
      key={mission.id}
      position={{ lat: mission.lat as number, lng: mission.long as number }}
    />
  );
  // If a cluster
  if (!marker.properties.id) {
    return (
      <MapView.Marker
        key={key}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0],
        }}
      >
        <ClusterMarker count={marker.properties.point_count} />
      </MapView.Marker>
    );
  }
  const mainCategory = mission?.categories[0];
  const colorKey = mainCategory ? missionTypes[mission?.categories[0]].color : "neutral";
  const color = colors[colorKey][800];

  return (
    <MapView.Marker
      key={key}
      pinColor={color}
      style={{
        backgroundColor: color,
      }}
      onPress={() => onPress && onPress(marker.properties.id)}
      coordinate={{
        latitude: marker.geometry.coordinates[1],
        longitude: marker.geometry.coordinates[0],
      }}
    />
  );
};

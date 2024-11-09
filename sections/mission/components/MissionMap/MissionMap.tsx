"use client";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { useExploreMissions } from "@/mission/application/useExploreMissions";
import { mapSettings } from "./settings";
import { Marker } from "./partials/Marker";

export const MissionMap = () => {
  const { missions, refetch } = useExploreMissions();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCcY7g-HEkrTVHkuj5MvNDRPQNGeQF8CzA",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map: any) => {
    setMap(map);
    refetch();
  }, []);

  const onUnmount = React.useCallback((map: any) => {
    setMap(null);
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  return isLoaded ? (
    <GoogleMap
      options={{
        styles: mapSettings.customMapStyle,
        streetViewControl: false,
        disableDefaultUI: true,
        streetView: null,
      }}
      mapContainerStyle={{ height: "100vh", width: "100%" }}
      center={{ lat: 0, lng: 0 }}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {missions && missions.map((mission) => <Marker mission={mission} key={mission.id} />)}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MissionMap);

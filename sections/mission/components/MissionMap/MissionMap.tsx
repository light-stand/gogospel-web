"use client";
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { mapSettings } from "./settings";
import { Mission } from "@/mission/domain/Mission";
import { Marker } from "./partials/Marker";

export const MissionMap = ({ missions }: { missions: Mission[] }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCcY7g-HEkrTVHkuj5MvNDRPQNGeQF8CzA",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map: any) => {
    setMap(null);
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
      {missions.map((mission) => (
        <Marker mission={mission} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MissionMap);

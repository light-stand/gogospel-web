"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { mapSettings } from "./settings";
import { Mission } from "@/mission/domain/Mission";

const center = {
  lat: -3.745,
  lng: -38.523,
};

export const MissionMap = ({ missions }: { missions: Mission[] }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCcY7g-HEkrTVHkuj5MvNDRPQNGeQF8CzA",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map: any) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

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
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {missions.map((mission) => (
        <Marker key={mission.id} position={{ lat: mission.lat, lng: mission.long }} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MissionMap);

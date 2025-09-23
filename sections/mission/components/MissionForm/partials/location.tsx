"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useTranslations } from "next-intl";
import { useController, UseFormReturn } from "react-hook-form";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { AutoComplete, Icon } from "@/components/ui";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MissionCreationFields } from "@/mission/domain/MissionCreationForm";
import {
  autoCompleteAction,
  AutoCompleteResult,
  getPlaceDetailsAction,
} from "@/app/api/maps";
import { mapSettings } from "../../MissionMap/settings";

export const LocationSection = ({
  form,
}: {
  form: UseFormReturn<MissionCreationFields>;
}) => {
  const t = useTranslations("mission.creation");

  const { field } = useController({
    control: form.control,
    name: "location",
  });

  const location = field.value;

  const [searchValue, setSearchValue] = useState("");

  const { data: autoCompleteOptions, refetch: triggerAutoCompleteFetch } =
    useQuery({
      queryKey: ["autoComplete", searchValue],
      queryFn: async () => await autoCompleteAction(searchValue),
      enabled: false,
    });

  const onLocationPress = async (value: string) => {
    const { place_id, description } = autoCompleteOptions?.find(
      (opt) => opt.place_id === value,
    ) as AutoCompleteResult;
    const placeInfo = await getPlaceDetailsAction(place_id);
    const coords = placeInfo.geometry.location;
    field?.onChange({
      latitude: coords.lat,
      longitude: coords.lng,
      locationName: description,
      country:
        placeInfo.address_components?.find(
          (c: { long_name: string; short_name: string; types: string[] }) =>
            c.types.includes("country"),
        )?.short_name || "",
    });
    setSearchValue("");
  };

  // Debounce the search value
  useEffect(() => {
    const timeout = setTimeout(triggerAutoCompleteFetch, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCcY7g-HEkrTVHkuj5MvNDRPQNGeQF8CzA",
  });

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-neutral-700 font-bold text-xl">
        {t("titles.location")}
      </h2>
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormControl>
              <AutoComplete
                emptyMessage="No hay resultados"
                placeholder="Busca una ubicación"
                inputPlaceholder="Buscar..."
                onSearch={setSearchValue}
                onSelect={onLocationPress}
                options={(autoCompleteOptions || []).map((opt) => ({
                  value: opt.place_id,
                  label: opt.description,
                }))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {location?.locationName && (
        <p className="font-bold text-neutral-500 flex">
          <Icon name="map-marker" className="mr-2" size={1} />
          {location.locationName}
        </p>
      )}
    </div>
  );
};

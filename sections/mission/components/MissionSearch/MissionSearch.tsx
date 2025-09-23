"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";

import {
  autoCompleteAction,
  AutoCompleteResult,
  getPlaceDetailsAction,
} from "@/app/api/maps";
import { Input } from "@/common/components/ui/input";
import { Icon } from "@/components/ui";

export const MissionSearch = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    () => searchParams.get("location") || "",
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const { data: autoCompleteOptions, refetch: triggerAutoCompleteFetch } =
    useQuery({
      queryKey: ["autoComplete", searchValue],
      queryFn: async () => await autoCompleteAction(searchValue),
      enabled: false,
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!isDropdownVisible) {
      setDropdownVisible(true);
    }
  };

  const onLocationPress = async (placeId: string) => {
    const selectedOption = autoCompleteOptions?.find(
      (opt) => opt.place_id === placeId,
    ) as AutoCompleteResult;
    if (!selectedOption) return;

    const { place_id, description } = selectedOption;
    setSearchValue(description);
    setDropdownVisible(false);

    const placeInfo = await getPlaceDetailsAction(place_id);
    const coords = placeInfo.geometry.location;
    const newLocation = {
      latitude: coords.lat,
      longitude: coords.lng,
      locationName: description,
      country:
        placeInfo.address_components?.find(
          (c: { long_name: string; short_name: string; types: string[] }) =>
            c.types.includes("country"),
        )?.short_name || "",
    };

    const params = new URLSearchParams(searchParams);
    params.set("lat", newLocation.latitude.toString());
    params.set("long", newLocation.longitude.toString());
    params.set("location", newLocation.locationName);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (searchValue) {
      const timeout = setTimeout(triggerAutoCompleteFetch, 500);
      return () => clearTimeout(timeout);
    }
  }, [searchValue, triggerAutoCompleteFetch]);

  return (
    <div className="flex flex-col space-y-2 relative">
      <div className="relative flex items-center h-14 text-xl border rounded-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 ring-indigo-500">
        <Icon
          className="h-5 w-5 absolute left-3 text-gray-400"
          name="map-marker"
        />
        <Input
          className="p-4 h-full rounded-xl pl-10 border-none focus:ring-0 w-full"
          placeholder={t("maps.picker.search")}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setDropdownVisible(true)}
          onBlur={() => setTimeout(() => setDropdownVisible(false), 150)}
        />
      </div>
      {isDropdownVisible && searchValue && (
        <div className="absolute z-30 w-full bg-white border border-gray-200 rounded-lg top-16 shadow-lg">
          {autoCompleteOptions && autoCompleteOptions.length > 0 ? (
            autoCompleteOptions.map((opt) => (
              <div
                key={opt.place_id}
                className="p-4 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => onLocationPress(opt.place_id)}
              >
                {opt.description}
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No hay resultados</div>
          )}
        </div>
      )}
    </div>
  );
};

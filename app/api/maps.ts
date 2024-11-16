"use server";
import { geocode, autoComplete, getPlaceDetails, reverseGeocode } from "@/maps/interface/mapsApi";

export type AutoCompleteResult = { description: string; place_id: string };

type LatLng = { latitude: number; longitude: number };

// File used to proxy the requests to the Google Maps API

export const geocodeAction = async (address: string) => await geocode(address);

export const reverseGeocodeAction = async (coords: LatLng) => await reverseGeocode(coords);

export const autoCompleteAction = async (input: string) => await autoComplete(input);

export const getPlaceDetailsAction = async (placeId: string) => await getPlaceDetails(placeId);

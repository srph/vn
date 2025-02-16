"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  useLoadScript,
  OverlayView,
} from "@react-google-maps/api";
import { ItineraryItem } from "../data/itinerary";
import { useMemo, useState, useEffect, useCallback } from "react";
import { Location } from "../types";

interface MapProps {
  itinerary: ItineraryItem[];
  selectedDate: string;
  selectedItem: ItineraryItem | null;
  onItemSelect: (item: ItineraryItem | null) => void;
  userLocation: Location | null;
  onLocationChange: (location: Location | null) => void;
}

export default function Map({
  itinerary,
  selectedDate,
  selectedItem,
  onItemSelect,
  userLocation,
  onLocationChange,
}: MapProps) {
  const [watchId, setWatchId] = useState<number | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          onLocationChange({
            coords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
      setWatchId(id);
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [onLocationChange]);

  // Calculate distances
  const getDistance = useCallback(
    (p1: google.maps.LatLngLiteral, p2: google.maps.LatLngLiteral) => {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = (p1.lat * Math.PI) / 180;
      const φ2 = (p2.lat * Math.PI) / 180;
      const Δφ = ((p2.lat - p1.lat) * Math.PI) / 180;
      const Δλ = ((p2.lng - p1.lng) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // distance in meters
    },
    []
  );

  const handleCenterOnUser = useCallback(() => {
    if (userLocation && mapInstance) {
      mapInstance.panTo(userLocation.coords);
      mapInstance.setZoom(15);
    }
  }, [userLocation, mapInstance]);

  const getGoogleMapsUrl = useCallback(() => {
    if (!selectedItem) return "#";
    return selectedItem.location.url;
  }, [selectedItem]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const filteredLocations = useMemo(
    () => itinerary.filter((item) => item.date === selectedDate),
    [itinerary, selectedDate]
  );

  const center = useMemo(
    () =>
      selectedItem?.location.coordinates ||
      filteredLocations[0]?.location.coordinates || {
        lat: 10.7721,
        lng: 106.693,
      },
    [selectedItem, filteredLocations]
  );

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: true,
      gestureHandling: "cooperative",
      minZoom: 11,
      maxZoom: 18,
      animation: true,
      styles: [
        {
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }],
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    }),
    []
  );

  if (!isLoaded)
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
        Loading map...
      </div>
    );

  // Move marker icons here, after isLoaded check
  const selectedMarkerIcon = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
    fillColor: "#EF4444",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "#B91C1C",
    scale: 2,
    anchor: new google.maps.Point(12, 17),
  };

  const defaultMarkerIcon = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
    fillColor: "#F87171",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "#DC2626",
    scale: 1.5,
    anchor: new google.maps.Point(12, 17),
  };

  const userLocationMarker = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#4F46E5",
    fillOpacity: 1,
    strokeColor: "#FFFFFF",
    strokeWeight: 2,
  };

  return (
    <div className="relative h-full w-full">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={13}
        options={mapOptions}
        onLoad={setMapInstance}
      >
        {filteredLocations.map((item, idx) => (
          <div key={idx}>
            <Marker
              position={item.location.coordinates}
              title={`${item.activity} (Click to select, or right-click to open in Google Maps)`}
              animation={
                item === selectedItem ? google.maps.Animation.BOUNCE : undefined
              }
              icon={
                item === selectedItem ? selectedMarkerIcon : defaultMarkerIcon
              }
              onClick={() => onItemSelect(item)}
              onRightClick={() => window.open(item.location.url, "_blank")}
            />
          </div>
        ))}
        {userLocation && (
          <>
            <Marker
              position={userLocation.coords}
              title="You are here"
              icon={userLocationMarker}
              zIndex={1000}
            />
            <Circle
              center={userLocation.coords}
              radius={userLocation.accuracy}
              options={{
                fillColor: "#4F46E5",
                fillOpacity: 0.1,
                strokeColor: "#4F46E5",
                strokeOpacity: 0.3,
                strokeWeight: 1,
                zIndex: 999,
              }}
            />
          </>
        )}
      </GoogleMap>
      {userLocation && (
        <button
          onClick={handleCenterOnUser}
          className="absolute bottom-4 right-4 rounded-full bg-white p-3 shadow-lg hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
          title="Center on my location"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      )}
      {selectedItem && (
        <a
          href={selectedItem.location.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-lg hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
        >
          Open in Google Maps
        </a>
      )}
    </div>
  );
}

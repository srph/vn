"use client";

import { useState } from "react";
import Timeline from "./components/Timeline";
import Map from "./components/Map";
import { itinerary, ItineraryItem } from "./data/itinerary";
import { Location } from "./types";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>("2025-02-17");
  const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(
    itinerary.find((item) => item.date === "2025-02-17") || null
  );
  const [userLocation, setUserLocation] = useState<Location | null>({
    coords: {
      lat: 10.779127013937405,
      lng: 106.70398208285836,
    },
    // coords: {
    //   lat: 10.8184, // Tan Son Nhat coordinates
    //   lng: 106.6588,
    // },
    accuracy: 20,
  });

  const handleItemSelect = (item: ItineraryItem | null) => {
    setSelectedItem(item);
    if (item) {
      setSelectedDate(item.date);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col bg-white dark:bg-gray-900 lg:flex-row">
        <div className="h-[50vh] overflow-y-auto border-b border-gray-200 dark:border-gray-700 lg:h-screen lg:w-1/3 lg:border-b-0 lg:border-r">
          <Timeline
            itinerary={itinerary}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            selectedItem={selectedItem}
            onItemSelect={handleItemSelect}
            userLocation={userLocation}
          />
        </div>
        <div className="h-[50vh] w-full lg:h-screen lg:w-2/3">
          <Map
            itinerary={itinerary}
            selectedDate={selectedDate}
            selectedItem={selectedItem}
            onItemSelect={handleItemSelect}
            userLocation={userLocation}
            onLocationChange={setUserLocation}
          />
        </div>
      </main>
    </>
  );
}

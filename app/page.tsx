"use client";

import { useState } from "react";
import Timeline from "./components/Timeline";
import Map from "./components/Map";
import { itinerary, ItineraryItem } from "./data/itinerary";
import { Location } from "./types";
import { VIETNAMESE_PHRASES } from "./data/phrases";
import { PhrasebookCard } from "./components/PhrasebookCard";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>("2025-02-17");
  const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(
    itinerary.find((item) => item.date === "2025-02-17") || null
  );
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const handleItemSelect = (item: ItineraryItem | null) => {
    setSelectedItem(item);
    if (item) {
      setSelectedDate(item.date);
    }
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col bg-white lg:flex-row dark:bg-neutral-900">
        <div className="h-[50vh] overflow-y-auto border-b border-neutral-200 lg:h-screen lg:w-1/3 lg:border-b-0 lg:border-r dark:border-neutral-700">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-[64px] font-bold leading-none">Our</div>
              <div className="size-10 w-full rounded-lg bg-red-500 bg-[url('/heading-1.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-dmSerifDisplay text-[64px] font-[800] italic leading-none">
                Vietnam
              </div>
              <div className="size-10 w-full rounded-lg bg-red-500"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-10 w-full rounded-lg bg-red-500 bg-[url('/heading-2.jpg')] bg-cover bg-center"></div>
              <div className="text-[64px] font-bold italic leading-none">
                Trip
              </div>
            </div>
          </div>

          <Timeline
            itinerary={itinerary}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            selectedItem={selectedItem}
            onItemSelect={handleItemSelect}
            userLocation={userLocation}
          />

          <section className="p-4 pt-0">
            <h2 className="mb-4 text-3xl font-bold">
              <span className="font-dmSerifDisplay italic">Common</span> Phrases
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {VIETNAMESE_PHRASES.map((phrase) => (
                <div
                  key={phrase.id}
                  className="space-y-2 rounded-lg bg-neutral-800 p-4"
                >
                  <div className="text-sm text-neutral-400">{phrase.en}</div>
                  <div className="text-xl font-bold">{phrase.vn}</div>
                  <div className="text-sm italic text-neutral-500">
                    /{phrase.pronunciation}/
                  </div>
                </div>
              ))}
            </div>
          </section>
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
      </div>
    </main>
  );
}

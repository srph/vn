import { format, parseISO, parse, isBefore } from "date-fns";
import { itinerary, ItineraryItem } from "../data/itinerary";
import { useCallback, useMemo } from "react";
import debounce from "lodash/debounce";
import { getDistance } from "../utils/distance";
import { Location } from "../types";

interface TimelineProps {
  itinerary: ItineraryItem[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
  selectedItem: ItineraryItem | null;
  onItemSelect: (item: ItineraryItem | null) => void;
  userLocation: Location | null;
}

const dates = [...new Set(itinerary.map((item) => item.date))];

const isItemDone = (item: ItineraryItem) => {
  const itemDateTime = parse(
    `${item.date} ${item.time}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  return isBefore(itemDateTime, new Date());
};

export default function Timeline({
  selectedDate,
  onDateSelect,
  selectedItem,
  onItemSelect,
  userLocation,
}: TimelineProps) {
  const debouncedItemSelect = useCallback(
    debounce((item: ItineraryItem) => {
      onItemSelect(item);
      onDateSelect(item.date);
    }, 100),
    [onItemSelect, onDateSelect]
  );

  const handleItemSelect = (
    event: React.MouseEvent<HTMLDivElement>,
    item: ItineraryItem
  ) => {
    event.stopPropagation();
    debouncedItemSelect(item);
  };

  const handleDateSelect = (date: string) => {
    onDateSelect(date);
    const firstEvent = itinerary.find((item) => item.date === date);
    onItemSelect(firstEvent || null);
  };

  return (
    <div className="space-y-2 p-4">
      {dates.map((date) => (
        <div
          key={date}
          className={`rounded border p-2 transition-colors ${
            date === selectedItem?.date
              ? "border-dashed border-orange-500"
              : "border-transparent dark:bg-transparent"
          }`}
        >
          <h2
            className="cursor-pointer py-2 pl-4 text-lg font-bold dark:text-white"
            onClick={() => handleDateSelect(date)}
          >
            {format(parseISO(date), "MMMM d, yyyy")}
          </h2>

          <div className="relative mx-2">
            {itinerary.filter((item) => item.date === date).length > 0 && (
              <div
                className="absolute left-[15px] top-[14px] w-[2px] bg-neutral-200 dark:bg-neutral-700"
                style={{
                  height: "calc(100% - 28px)",
                }}
              />
            )}

            {itinerary
              .filter((item) => item.date === date)
              .map((item, idx, arr) => (
                <div
                  key={idx}
                  className={`scale-1 relative mb-2 scale-100 cursor-pointer rounded p-1 pl-10 pr-2 transition-all hover:scale-[1.05] active:scale-100 ${
                    selectedItem === item
                      ? "bg-blue-100 hover:bg-blue-200 dark:bg-orange-500 dark:hover:bg-orange-500"
                      : "hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700"
                  }`}
                  onClick={(event) => handleItemSelect(event, item)}
                >
                  <div className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform">
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        isItemDone(item)
                          ? "border-transparent bg-green-500 dark:bg-green-600"
                          : "border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-800"
                      }`}
                    >
                      {isItemDone(item) && (
                        <svg
                          className="h-2.5 w-2.5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span
                        className={`inline-block w-[72px] shrink-0 text-right text-neutral-600 ${
                          selectedItem === item
                            ? "dark:text-neutral-600"
                            : "dark:text-neutral-400"
                        }`}
                      >
                        {format(
                          parse(item.time, "HH:mm", new Date()),
                          "h:mm a"
                        )}
                      </span>
                      <span className="truncate dark:text-neutral-100">
                        {item.activity}
                      </span>
                    </div>

                    {userLocation && (
                      <span
                        className={`ml-2 shrink-0 text-sm text-neutral-500 dark:text-neutral-400 ${
                          selectedItem === item
                            ? "dark:text-neutral-600"
                            : "dark:text-neutral-400"
                        }`}
                      >
                        {Math.round(
                          getDistance(
                            userLocation.coords,
                            item.location.coordinates
                          ) / 1000
                        )}
                        km
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

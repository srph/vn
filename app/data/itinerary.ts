export interface ItineraryItem {
  date: string;
  time: string;
  activity: string;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    url: string;
  };
}

export const itinerary: ItineraryItem[] = [
  {
    date: "2025-02-17",
    time: "02:30",
    activity: "Arrive Tan Son Nhat International Airport",
    location: {
      name: "Tan Son Nhat International Airport",
      coordinates: { lat: 10.8184, lng: 106.6588 },
      url: "https://maps.app.goo.gl/1usTfTxmxmpksaBr7",
    },
  },
  {
    date: "2025-02-17",
    time: "03:30",
    activity: "Checkin Silverland May Hotel",
    location: {
      name: "Silverland May Hotel",
      coordinates: { lat: 10.779127013937405, lng: 106.70398208285836 },
      url: "https://maps.app.goo.gl/AeUhbinYFcihsZs4A",
    },
  },
  {
    date: "2025-02-17",
    time: "08:00",
    activity: "Prepare at Hotel",
    location: {
      name: "Silverland May Hotel",
      coordinates: { lat: 10.779127013937405, lng: 106.70398208285836 },
      url: "https://maps.app.goo.gl/AeUhbinYFcihsZs4A",
    },
  },
  {
    date: "2025-02-17",
    time: "10:00",
    activity: "The Cafe Apartment",
    location: {
      name: "The Cafe Apartment",
      coordinates: { lat: 10.774055368406964, lng: 106.70409744352499 },
      url: "https://maps.app.goo.gl/qTAqrvjAUwokBfFs5",
    },
  },
  {
    date: "2025-02-17",
    time: "12:00",
    activity: "Ben Thanh Market",
    location: {
      name: "Ben Thanh Market",
      coordinates: { lat: 10.772558943282233, lng: 106.69802871680955 },
      url: "https://maps.app.goo.gl/Si3i7fMHyrzzDrsx5",
    },
  },
  {
    date: "2025-02-17",
    time: "16:00",
    activity: "Saigon Central Post Office",
    location: {
      name: "Saigon Central Post Office",
      coordinates: { lat: 10.779948997610964, lng: 106.69990446640394 },
      url: "https://maps.app.goo.gl/HK8TjC8MwtBE1a6e9",
    },
  },
  {
    date: "2025-02-17",
    time: "18:00",
    activity: "Saigon Opera House",
    location: {
      name: "Saigon Opera House",
      coordinates: { lat: 10.776547053470788, lng: 106.70308102045962 },
      url: "https://maps.app.goo.gl/7AXhkNwLvA839pfi7",
    },
  },
  {
    date: "2025-02-17",
    time: "19:00",
    activity: "Visit Book Street",
    location: {
      name: "Book Street",
      coordinates: { lat: 10.780986463178944, lng: 106.70007579551313 },
      url: "https://maps.app.goo.gl/4SeCrYx8M937v3eU8",
    },
  },
  {
    date: "2025-02-17",
    time: "20:00",
    activity: "Rest at Hotel",
    location: {
      name: "Silverland May Hotel",
      coordinates: { lat: 10.779127013937405, lng: 106.70398208285836 },
      url: "https://maps.app.goo.gl/AeUhbinYFcihsZs4A",
    },
  },
  // Feb 18
  {
    date: "2025-02-18",
    time: "10:00",
    activity: "Prepare at Hotel",
    location: {
      name: "Silverland May Hotel",
      coordinates: { lat: 10.779127013937405, lng: 106.70398208285836 },
      url: "https://maps.app.goo.gl/AeUhbinYFcihsZs4A",
    },
  },
  {
    date: "2025-02-18",
    time: "12:00",
    activity: "Vincom Center Mall",
    location: {
      name: "Vincom Center",
      coordinates: { lat: 10.777984949239276, lng: 106.70165215944351 },
      url: "https://maps.app.goo.gl/tjatF6HRb5Wymf9K8",
    },
  },
  {
    date: "2025-02-18",
    time: "14:00",
    activity: "Uniqlo",
    location: {
      name: "Uniqlo Dong Khoi",
      coordinates: { lat: 10.777462919240753, lng: 106.70209047113237 },
      url: "https://maps.app.goo.gl/sm9ya6hi1RMacLJv6",
    },
  },
  {
    date: "2025-02-18",
    time: "16:00",
    activity: "Landmark 81",
    location: {
      name: "Landmark 81",
      coordinates: { lat: 10.795147905549449, lng: 106.7220961747883 },
      url: "https://maps.app.goo.gl/KuL8hinYWVeJ8jCWA",
    },
  },
  {
    date: "2025-02-18",
    time: "18:00",
    activity: "Cong Ca Phe",
    location: {
      name: "Cong Ca Phe",
      coordinates: { lat: 10.793943762432004, lng: 106.72179707563585 },
      url: "https://maps.app.goo.gl/cAL9PNBSLf6UKreb8",
    },
  },
  {
    date: "2025-02-18",
    time: "20:00",
    activity: "Rest at Hotel",
    location: {
      name: "Silverland May Hotel",
      coordinates: { lat: 10.779127013937405, lng: 106.70398208285836 },
      url: "https://maps.app.goo.gl/AeUhbinYFcihsZs4A",
    },
  },
  // Feb 19
  {
    date: "2025-02-19",
    time: "10:00",
    activity: "Prepare at Hotel",
    location: {
      name: "Silverland May Hotel",
      coordinates: { lat: 10.779127013937405, lng: 106.70398208285836 },
      url: "https://maps.app.goo.gl/AeUhbinYFcihsZs4A",
    },
  },
  {
    date: "2025-02-19",
    time: "16:00",
    activity: "Arrive at Tan Son Nhat International Airport",
    location: {
      name: "Tan Son Nhat International Airport",
      coordinates: { lat: 10.8184, lng: 106.6588 },
      url: "https://maps.app.goo.gl/1usTfTxmxmpksaBr7",
    },
  },
];

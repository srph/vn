import "./globals.css";
import { Funnel_Display, DM_Serif_Display } from "next/font/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vietnam Itinerary",
  description: "A detailed itinerary for my trip to Ho Chi Minh City, Vietnam",
  keywords: ["vietnam", "travel", "itinerary", "ho chi minh city", "saigon"],
  authors: [{ name: "Kier Borromeo" }],
  openGraph: {
    title: "Vietnam Itinerary",
    description:
      "A detailed itinerary for my trip to Ho Chi Minh City, Vietnam",
    url: "https://vn.kierb.com",
    siteName: "Vietnam Itinerary",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vietnam Itinerary",
    description:
      "A detailed itinerary for my trip to Ho Chi Minh City, Vietnam",
  },
};

const funnelDisplay = Funnel_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-funnel-display",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${funnelDisplay.className} ${dmSerifDisplay.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22><rect width=%2232%22 height=%2232%22 fill=%22%23DA251D%22/><polygon points=%2216,4 20.5,17 8,11 24,11 11.5,17%22 fill=%22%23FFFF00%22/></svg>"
        />
      </head>
      <body className="dark:bg-gray-900 dark:text-gray-100">{children}</body>
    </html>
  );
}

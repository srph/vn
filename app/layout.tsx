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
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="dark:bg-neutral-900 dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
}

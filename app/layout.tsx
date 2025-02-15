import "./globals.css";
import { GeistSans } from "geist/font/sans";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${GeistSans.className}`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇻🇳</text></svg>"
        />
      </head>
      <body className="dark:bg-gray-900 dark:text-gray-100">{children}</body>
    </html>
  );
}

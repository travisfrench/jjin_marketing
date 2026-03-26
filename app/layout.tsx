import type { Metadata } from "next";
import { Sora, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoSansKr = localFont({
  variable: "--font-noto-kr",
  display: "swap",
  src: [
    {
      path: "../public/marketing/fonts/NotoSansKR-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/marketing/fonts/NotoSansKR-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/marketing/fonts/NotoSansKR-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/marketing/fonts/NotoSansKR-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/marketing/fonts/NotoSansKR-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/marketing/fonts/NotoSansKR-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Jjin | Learn Korean for real-life moments",
  description:
    "Study real Korean phrases for cafes, restaurants, transit, hotels, and everyday life in Korea.",
  applicationName: "Jjin",
  metadataBase: new URL("https://jjin.app"),
  openGraph: {
    title: "Jjin | Learn Korean for real-life moments",
    description:
      "Study real Korean phrases for cafes, restaurants, transit, hotels, and everyday life in Korea.",
    siteName: "Jjin",
    type: "website",
    images: [
      {
        url: "/marketing/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jjin app preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#F0E4D9]">
      <body
        id="top"
        className={`${sora.variable} ${sourceSans.variable} ${notoSansKr.variable} min-h-full bg-[#F0E4D9] font-body text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

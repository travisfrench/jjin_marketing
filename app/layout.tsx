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
  title: "Jinjja | Learn Korean for real-life moments",
  description:
    "Study real Korean phrases for cafes, restaurants, transit, hotels, and everyday life in Korea.",
  applicationName: "Jinjja",
  metadataBase: new URL("https://jinjja.app"),
  openGraph: {
    title: "Jinjja | Learn Korean for real-life moments",
    description:
      "Study real Korean phrases for cafes, restaurants, transit, hotels, and everyday life in Korea.",
    siteName: "Jinjja",
    type: "website",
    images: [
      {
        url: "/marketing/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jinjja app preview",
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
    <html lang="en" className="h-full bg-background">
      <body
        id="top"
        className={`${sora.variable} ${sourceSans.variable} ${notoSansKr.variable} min-h-full bg-background font-body text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

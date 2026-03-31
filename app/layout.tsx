import { Sora, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { JsonLd } from "@/components/seo/json-ld";
import { buildSiteSchema, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
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

export const metadata = createMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className="h-full bg-white">
      <body
        id="top"
        className={`${sora.variable} ${sourceSans.variable} ${notoSansKr.variable} min-h-full bg-white font-body text-foreground antialiased`}
      >
        <JsonLd data={buildSiteSchema()} />
        {children}
        {isProduction && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-ETHNQ99GZ0"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-ETHNQ99GZ0');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

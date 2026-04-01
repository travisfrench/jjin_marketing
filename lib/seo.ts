import type { Metadata } from "next";
import { appStoreUrl, siteConfig } from "@/lib/site-config";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

export const publicSitePages = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  {
    path: "/korean-learning-app",
    priority: 0.95,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/learn-korean-for-travel",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/korean-listening-practice",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { path: "/learn-hangul", priority: 0.85, changeFrequency: "monthly" as const },
  {
    path: "/korean-phrases-app",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/support", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

function normalizePath(path: string) {
  if (!path) return "/";
  if (path === "/") return path;

  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path = "/") {
  return new URL(normalizePath(path), siteConfig.siteUrl).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: MetadataInput): Metadata {
  const canonicalPath = normalizePath(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    applicationName: siteConfig.name,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: canonicalPath,
    },
    icons: {
      icon: "/favicon.png",
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: `${siteConfig.name} app preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildSiteSchema() {
  const organizationId = absoluteUrl("/#organization");
  const websiteId = absoluteUrl("/#website");
  const applicationId = absoluteUrl("/#software-application");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/favicon.png"),
        },
        sameAs: [appStoreUrl],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.siteUrl,
        name: siteConfig.name,
        description: siteConfig.defaultDescription,
        inLanguage: siteConfig.language,
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": applicationId,
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "iOS",
        description: siteConfig.defaultDescription,
        downloadUrl: appStoreUrl,
        installUrl: appStoreUrl,
        image: absoluteUrl(siteConfig.ogImage),
        screenshot: [
          absoluteUrl("/marketing/screenshots/study-card-light.webp"),
          absoluteUrl("/marketing/screenshots/category-courtesy-light.webp"),
          absoluteUrl("/marketing/screenshots/hangul-basics.webp"),
          absoluteUrl("/marketing/screenshots/quiz-light.webp"),
          absoluteUrl("/marketing/screenshots/conversation-light.webp"),
        ],
        publisher: {
          "@id": organizationId,
        },
        isPartOf: {
          "@id": websiteId,
        },
        inLanguage: siteConfig.language,
      },
    ],
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

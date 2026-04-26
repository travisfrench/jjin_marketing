import type { MetadataRoute } from "next";
import { absoluteUrl, publicSitePages } from "@/lib/seo";
import { getPhrasePath, getSitemapPhrases } from "@/lib/phrases/phrase-data";
import { getPhraseHubs } from "@/lib/phrases/phrase-hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = publicSitePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const phraseLibraryPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/korean-phrases"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.86,
    },
    ...getPhraseHubs()
      .filter((hub) => hub.indexablePhrases.length >= 3)
      .map((hub) => ({
        url: absoluteUrl(hub.path),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.78,
      })),
  ];

  const phrasePages = getSitemapPhrases().map((phrase) => ({
    url: absoluteUrl(getPhrasePath(phrase)),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: Math.min(0.84, 0.52 + phrase.seoPriority / 40),
  }));

  return [...staticPages, ...phraseLibraryPages, ...phrasePages];
}

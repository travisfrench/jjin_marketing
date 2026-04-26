import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PhraseHubTemplate } from "@/components/phrases/phrase-hub-template";
import { getPhraseHub, getPhraseHubs } from "@/lib/phrases/phrase-hubs";
import { buildHubMetadata } from "@/lib/phrases/phrase-seo";

type PhraseHubPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getPhraseHubs().map((hub) => ({
    category: hub.category,
  }));
}

export async function generateMetadata({
  params,
}: PhraseHubPageProps): Promise<Metadata> {
  const { category } = await params;
  const hub = getPhraseHub(category);

  if (!hub) return {};

  return buildHubMetadata(hub.category);
}

export default async function PhraseHubPage({ params }: PhraseHubPageProps) {
  const { category } = await params;
  const hub = getPhraseHub(category);

  if (!hub) notFound();

  return (
    <PhraseHubTemplate
      hub={hub}
      relatedHubs={getPhraseHubs().filter((item) => item.category !== hub.category)}
    />
  );
}

import { SeoLandingPageTemplate } from "@/components/marketing/landing-content";
import { createMetadata } from "@/lib/seo";
import { getRequiredLandingPageBySlug } from "@/lib/seo-page-content";

const page = getRequiredLandingPageBySlug("learn-korean-for-travel");

export const metadata = createMetadata({
  title: page.metadataTitle,
  description: page.metadataDescription,
  path: page.path,
});

export default function LearnKoreanForTravelPage() {
  return <SeoLandingPageTemplate page={page} />;
}

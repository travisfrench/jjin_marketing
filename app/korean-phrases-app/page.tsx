import { SeoLandingPageTemplate } from "@/components/marketing/landing-content";
import { createMetadata } from "@/lib/seo";
import { getRequiredLandingPageBySlug } from "@/lib/seo-page-content";

const page = getRequiredLandingPageBySlug("korean-phrases-app");

export const metadata = createMetadata({
  title: page.metadataTitle,
  description: page.metadataDescription,
  path: page.path,
});

export default function KoreanPhrasesAppPage() {
  return <SeoLandingPageTemplate page={page} />;
}

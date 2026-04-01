import { SeoLandingPageTemplate } from "@/components/marketing/landing-content";
import { createMetadata } from "@/lib/seo";
import { getRequiredLandingPageBySlug } from "@/lib/seo-page-content";

const page = getRequiredLandingPageBySlug("korean-listening-practice");

export const metadata = createMetadata({
  title: page.metadataTitle,
  description: page.metadataDescription,
  path: page.path,
});

export default function KoreanListeningPracticePage() {
  return <SeoLandingPageTemplate page={page} />;
}

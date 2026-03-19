import Link from "next/link";
import { SectionShell } from "@/components/marketing/section-shell";

export const metadata = {
  title: "Privacy Policy | Jinjja",
  description: "Privacy policy for the Jinjja iOS app.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen border-t border-white/10 pt-24">
      <SectionShell className="pb-20">
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(15,19,24,0.8),rgba(8,10,13,0.9))] p-6 sm:p-10">
          <div className="space-y-3">
            <Link href="/" className="text-sm text-warm transition hover:text-[#f1bd84]">
              Back to home
            </Link>
            <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted">Last updated: March 17, 2026</p>
          </div>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">What we collect</h2>
            <p>
              Jinjja collects account information (such as email address and sign-in
              provider details), app usage analytics, and saved study progress to keep
              your learning synced and personalized.
            </p>
          </section>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">How we use data</h2>
            <p>
              We use your data to provide core app features, improve phrase
              recommendations, maintain product reliability, and respond to support
              requests.
            </p>
          </section>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">Storage and security</h2>
            <p>
              Study progress and account records are stored on secure infrastructure.
              We apply access controls, encryption in transit, and routine monitoring to
              protect personal data.
            </p>
          </section>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">Your choices</h2>
            <p>
              You can request deletion of your account and associated study history at
              any time by contacting support. You may also limit analytics tracking in
              your device privacy settings.
            </p>
          </section>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">Contact</h2>
            <p>
              For privacy questions, email <a className="text-warm" href="mailto:privacy@jinjja.app">privacy@jinjja.app</a>.
            </p>
          </section>
        </div>
      </SectionShell>
    </main>
  );
}

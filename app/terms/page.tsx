import Link from "next/link";
import { SectionShell } from "@/components/marketing/section-shell";

export const metadata = {
  title: "Terms of Service | Jinjja",
  description: "Terms of service for the Jinjja iOS app.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen border-t border-white/10 pt-24">
      <SectionShell className="pb-20">
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(15,19,24,0.8),rgba(8,10,13,0.9))] p-6 sm:p-10">
          <div className="space-y-3">
            <Link href="/" className="text-sm text-warm transition hover:text-[#f1bd84]">
              Back to home
            </Link>
            <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Terms of Service
            </h1>
            <p className="text-sm text-muted">Last updated: March 17, 2026</p>
          </div>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">Acceptance of terms</h2>
            <p>
              By downloading or using Jinjja, you agree to these terms. If you do not
              agree, please do not use the app.
            </p>
          </section>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">License and usage</h2>
            <p>
              Jinjja grants you a personal, non-transferable license to use the app for
              learning Korean. You may not reverse engineer, resell, or redistribute app
              content without permission.
            </p>
          </section>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">Accounts and subscriptions</h2>
            <p>
              You are responsible for maintaining your account credentials. Paid features
              and renewals (if offered) are billed through your Apple ID under App Store
              terms.
            </p>
          </section>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">Disclaimers</h2>
            <p>
              The app is provided &quot;as is&quot; without warranties of uninterrupted access or
              specific learning outcomes. We may modify or discontinue parts of the
              service with reasonable notice.
            </p>
          </section>

          <section className="space-y-3 text-muted">
            <h2 className="font-heading text-xl text-foreground">Contact</h2>
            <p>
              Questions about these terms can be sent to <a className="text-warm" href="mailto:legal@jinjja.app">legal@jinjja.app</a>.
            </p>
          </section>
        </div>
      </SectionShell>
    </main>
  );
}

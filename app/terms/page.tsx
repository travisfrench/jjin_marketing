import Link from "next/link";
import { SectionShell } from "@/components/marketing/section-shell";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbSchema, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Service | Jjin Korean Learning App",
  description:
    "Read the terms of use for the Jjin iPhone app, including subscriptions, acceptable use, support, and liability terms.",
  path: "/terms",
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms" },
]);

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="min-h-screen border-t border-white/10 pt-24">
        <Navbar />
        <SectionShell className="pb-20">
          <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(15,19,24,0.8),rgba(8,10,13,0.9))] p-6 sm:p-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-white/45">
                Effective Date: March 19, 2026
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Jjin Korean Learning Terms of Use
              </h1>
              <p className="text-sm leading-7 text-white/72 sm:text-[15px]">
                These Terms of Use (“Terms”) govern your use of the Jjin Korean
                Learning mobile application, website, and related services
                operated by Travis French (“we,” “us,” or “our”).
              </p>
              <p className="text-sm leading-7 text-white/72 sm:text-[15px]">
                By downloading, accessing, or using Jjin Korean Learning, you
                agree to these Terms.
              </p>
              <p className="text-sm leading-7 text-white/72 sm:text-[15px]">
                If you access the app through Apple’s App Store, Apple’s standard
                Licensed Application End User License Agreement may also apply.
                These Terms are intended to supplement, not replace, any terms
                required by Apple for App Store distribution.
              </p>
            </div>

            <div className="space-y-8 text-sm leading-7 text-white/80 sm:text-[15px]">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">1. Use of the Service</h2>
              <p>
                Jjin Korean Learning provides Korean language learning
                content, including words, phrases, progress tracking, favorites,
                and premium subscription features.
              </p>
              <p>
                You may use the service only for your personal, non-commercial
                use and only in compliance with these Terms and applicable law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">2. Accounts</h2>
              <p>
                You may need to create an account to use some features of the
                app.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for activity that occurs under your
                account. You agree to provide accurate information and keep it
                updated.
              </p>
              <p>
                We may suspend or terminate accounts that violate these Terms or
                are used in a harmful, abusive, fraudulent, or unauthorized way.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                3. Subscriptions and Premium Access
              </h2>
              <p>
                Jjin Korean Learning offers a free tier and optional premium
                subscriptions, including monthly and annual plans.
              </p>
              <p>
                Subscriptions are purchased and billed through Apple using the
                App Store. Pricing, billing, renewal, cancellation, and refund
                handling are governed by Apple’s payment systems and policies.
              </p>
              <p>
                Unless you cancel, auto-renewing subscriptions renew
                automatically at the end of the applicable billing period. You
                can manage or cancel your subscription through your Apple
                account settings.
              </p>
              <p>
                We may change subscription features, pricing, or plan structure
                in the future to the extent permitted by applicable law and App
                Store rules.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-5 text-white/76">
                <li>
                  copy, reproduce, sell, sublicense, or commercially exploit the
                  app or its content except as expressly permitted
                </li>
                <li>
                  reverse engineer, decompile, or attempt to extract source code
                  except where prohibited by law from restricting that activity
                </li>
                <li>
                  scrape, download in bulk, or redistribute app content,
                  including audio, text, or learning materials
                </li>
                <li>
                  share accounts in a way that circumvents intended subscription
                  access
                </li>
                <li>
                  use the service to interfere with, disrupt, or compromise the
                  app or its users
                </li>
                <li>
                  use the service for unlawful, fraudulent, abusive, or
                  misleading purposes
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                5. Content and Intellectual Property
              </h2>
              <p>
                The app, including its design, text, audio, branding, features,
                lessons, and related materials, is owned by us or our licensors
                and is protected by applicable intellectual property laws.
              </p>
              <p>
                Subject to these Terms, we grant you a limited, non-exclusive,
                non-transferable, revocable license to use the app for
                personal, non-commercial purposes.
              </p>
              <p>No ownership rights are transferred to you.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                6. Support and Availability
              </h2>
              <p>
                We may update, modify, improve, suspend, or discontinue any part
                of the service at any time.
              </p>
              <p>
                We do not guarantee that the app will always be available,
                uninterrupted, or error-free.
              </p>
              <p>
                Support information is available at{" "}
                <Link
                  href="/support"
                  className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white/70"
                >
                  getJjin.com/support
                </Link>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">7. Privacy</h2>
              <p>
                Your use of the service is also governed by our Privacy Policy:{" "}
                <Link
                  href="/privacy"
                  className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white/70"
                >
                  getJjin.com/privacy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">8. Termination</h2>
              <p>
                We may suspend or terminate your access to the service if you
                violate these Terms, misuse the service, or create risk or legal
                exposure for us or other users.
              </p>
              <p>
                You may stop using the service at any time. Deleting the app
                does not automatically cancel an active subscription.
                Subscription cancellations must be handled through Apple.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">9. Disclaimers</h2>
              <p>
                Jjin Korean Learning is provided on an “as is” and “as
                available” basis to the maximum extent permitted by law.
              </p>
              <p>
                We do not guarantee specific learning outcomes, fluency results,
                uninterrupted access, or that the service will always be free
                from bugs, delays, or inaccuracies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                10. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, we and our affiliates,
                licensors, service providers, and partners will not be liable
                for any indirect, incidental, special, consequential,
                exemplary, or punitive damages, or for any loss of data,
                revenue, profits, goodwill, or business interruption arising out
                of or related to your use of the service.
              </p>
              <p>
                To the maximum extent permitted by law, our total liability for
                claims arising out of or related to the service will not exceed
                the greater of the amount you paid us through the service in the
                twelve months before the claim arose or fifty U.S. dollars.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                11. Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. When we do, we will
                update the Effective Date above. Continued use of the service
                after changes become effective means you accept the revised
                Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">12. Contact</h2>
              <p>Questions about these Terms may be sent to:</p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/76">
                <p>Travis French</p>
                <p>
                  <a
                    href="mailto:hello@getJjin.com"
                    className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white/70"
                  >
                    hello@getJjin.com
                  </a>
                </p>
              </div>
            </section>
            </div>
          </div>
        </SectionShell>
        <Footer />
      </main>
    </>
  );
}

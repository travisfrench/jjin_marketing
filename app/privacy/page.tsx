import Link from "next/link";
import { SectionShell } from "@/components/marketing/section-shell";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbSchema, createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy | Jjin Korean Learning App",
  description:
    "Read the privacy policy for the Jjin iPhone app, including account data, subscription information, analytics, and deletion requests.",
  path: "/privacy",
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
]);

export default function PrivacyPage() {
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
                Jjin Korean Learning Privacy Policy
              </h1>
              <p className="text-sm leading-7 text-white/72 sm:text-[15px]">
                Jjin Korean Learning (“Jjin Korean Learning,” “we,” “us,” or
                “our”) respects your privacy. This Privacy Policy explains what
                information we collect, how we use it, when we share it, and the
                choices available to you when you use the Jjin Korean Learning
                mobile application, our website, and related support services.
              </p>
              <p className="text-sm leading-7 text-white/72 sm:text-[15px]">
                By using Jjin Korean Learning, you agree to the practices
                described in this Privacy Policy.
              </p>
            </div>

            <div className="space-y-8 text-sm leading-7 text-white/80 sm:text-[15px]">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                1. Information We Collect
              </h2>
              <p>We may collect the following categories of information:</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white">Account Information</h3>
                  <p className="text-white/76">
                    When you create an account, we may collect your email
                    address, including an Apple private relay email address if
                    you choose Sign in with Apple.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-white">
                    App Usage and Learning Data
                  </h3>
                  <p className="text-white/76">
                    We collect information related to your use of the app, such
                    as favorites, saved items, learning progress, and similar
                    in-app activity needed to provide the service and
                    personalize your experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-white">
                    Subscription Information
                  </h3>
                  <p className="text-white/76">
                    We collect information about your subscription status, such
                    as whether you have a free or premium account. Purchases and
                    billing for subscriptions are processed by Apple through the
                    App Store.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-white">
                    Device and Technical Information
                  </h3>
                  <p className="text-white/76">
                    We may collect device identifiers and limited technical data
                    used for app functionality, analytics, fraud prevention, and
                    service improvement.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-white">
                    Support Communications
                  </h3>
                  <p className="text-white/76">
                    If you contact us for help or submit a request through our
                    website or support channels, we may collect the information
                    you provide, including your message and contact details.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                2. How We Use Information
              </h2>
              <p>We use information we collect to:</p>
              <ul className="list-disc space-y-2 pl-5 text-white/76">
                <li>create and manage your account</li>
                <li>provide the app and its features</li>
                <li>save your favorites and learning progress</li>
                <li>verify and manage premium subscription access</li>
                <li>
                  analyze app usage and improve performance, content, and user
                  experience
                </li>
                <li>send service-related messages and support responses</li>
                <li>send reminder nudges and occasional updates about the app</li>
                <li>protect the security and integrity of the service</li>
                <li>comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                3. Third Parties and Service Providers
              </h2>
              <p>
                We use third-party providers to operate parts of the service.
                These may include:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white">Apple</h3>
                  <p className="text-white/76">
                    We rely on Apple for App Store distribution, in-app
                    purchases, subscription billing, and, where used, Sign in
                    with Apple.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-white">Supabase</h3>
                  <p className="text-white/76">
                    We use Supabase to support account and backend service
                    functionality.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-white">RevenueCat</h3>
                  <p className="text-white/76">
                    We use RevenueCat to help manage subscription status and
                    premium entitlement handling.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-white">Google Analytics</h3>
                  <p className="text-white/76">
                    We use analytics tools to understand how users interact with
                    the app and to improve the service.
                  </p>
                </div>
              </div>

              <p>
                These providers may process certain information on our behalf or
                as part of the services they provide to us.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">4. Notifications</h2>
              <p>
                We may send push notifications for reminders, app activity
                nudges, and occasional updates. You can control push
                notification permissions in your device settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                5. How We Share Information
              </h2>
              <p>We do not sell your personal information.</p>
              <p>We may share information:</p>
              <ul className="list-disc space-y-2 pl-5 text-white/76">
                <li>with service providers that help us operate the app</li>
                <li>
                  with Apple in connection with subscriptions and App Store
                  functionality
                </li>
                <li>
                  when required by law, legal process, or government request
                </li>
                <li>
                  to protect our rights, users, or the security of the service
                </li>
                <li>
                  in connection with a merger, acquisition, sale, or transfer of
                  assets
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                6. Tracking and Advertising
              </h2>
              <p>
                We do not currently use your information for third-party
                targeted advertising.
              </p>
              <p>
                We use analytics to understand app performance and user
                behavior. If our data practices change in the future, we will
                update this Privacy Policy and any required App Store privacy
                disclosures.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">7. Data Retention</h2>
              <p>
                We retain personal information for as long as reasonably
                necessary to provide the service, maintain account records,
                comply with legal obligations, resolve disputes, and enforce
                agreements.
              </p>
              <p>
                Favorites, progress, subscription-related records, and support
                communications may be retained for these purposes unless
                deletion is required by law or completed in response to a valid
                request.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                8. Your Choices and Data Requests
              </h2>
              <p>
                You may request access to, correction of, or deletion of your
                information by contacting us through our support or deletion
                request process.
              </p>
              <p>
                To request deletion of your account or personal data, please
                submit a request through{" "}
                <Link
                  href="/support"
                  className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white/70"
                >
                  jjin.app/support
                </Link>
                .
              </p>
              <p>
                We may need to verify your identity before processing certain
                requests. We may also retain limited information where required
                for legal, security, fraud prevention, billing, or recordkeeping
                purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                9. Children’s Privacy
              </h2>
              <p>
                Jjin Korean Learning is not directed to children under 13, and
                we do not knowingly collect personal information from children
                under 13.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                10. Users in the United States and Canada
              </h2>
              <p>
                The service is intended for users in the United States and
                Canada. By using the service, you understand that your
                information may be processed and stored in the United States or
                other jurisdictions where our service providers operate.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">11. Security</h2>
              <p>
                We use reasonable administrative, technical, and organizational
                measures to protect information. No method of transmission or
                storage is completely secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                12. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. If we make
                material changes, we will update the Effective Date above and
                may provide additional notice where appropriate.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">13. Contact</h2>
              <p>
                If you have questions about this Privacy Policy or want to make
                a privacy-related request, contact:
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/76">
                <p>Travis French</p>
                <p>
                  <a
                    href="mailto:hello@jjin.app"
                    className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white/70"
                  >
                    hello@jjin.app
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

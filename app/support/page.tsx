import Link from "next/link";
import { Mail, MessageSquareText } from "lucide-react";
import { SectionShell } from "@/components/marketing/section-shell";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Support | Jinjja",
  description: "Get help for the Jinjja iOS app.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen border-t border-white/10 pt-24">
      <Navbar />
      <SectionShell className="pb-20">
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(15,19,24,0.8),rgba(8,10,13,0.9))] p-6 sm:p-10">
          <div className="space-y-3">
            <Link href="/" className="text-sm text-warm transition hover:text-[#f1bd84]">
              Back to home
            </Link>
            <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Support
            </h1>
            <p className="text-base text-muted">
              Need help with Jinjja? Reach us and we will get back to you as soon as we can.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <p className="flex items-center gap-2 text-foreground">
              <Mail size={18} className="text-warm" />
              support@getjinjja.com
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="font-heading text-xl text-foreground">Quick help</h2>
            <div className="space-y-3 text-sm text-muted sm:text-base">
              <p className="flex items-start gap-2">
                <MessageSquareText size={16} className="mt-1 text-warm" />
                I cannot access my previous progress.
              </p>
              <p className="pl-6">Use the same sign-in method as before. If the issue continues, email support with your account email.</p>
              <p className="flex items-start gap-2">
                <MessageSquareText size={16} className="mt-1 text-warm" />
                Audio is not playing in a lesson.
              </p>
              <p className="pl-6">Check silent mode and volume, then restart the app. If needed, contact support with your iOS version.</p>
              <p className="flex items-start gap-2">
                <MessageSquareText size={16} className="mt-1 text-warm" />
                How do I delete my account?
              </p>
              <p className="pl-6">If you are a premium member, cancel your membership through Apple Subscriptions. For account deletion, send us an email at support@getjinjja.com and we&apos;ll delete your account and all information.</p>
            </div>
          </section>
        </div>
      </SectionShell>
      <Footer />
    </main>
  );
}

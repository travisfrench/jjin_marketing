import { ArrowUp } from "lucide-react";
import { SectionShell } from "@/components/marketing/section-shell";
import { appStoreUrl } from "@/lib/marketing-content";

export function FinalCta() {
  return (
    <section id="download" className="relative border-t border-white/10 py-20 sm:py-24">
      <SectionShell>
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(20,24,31,0.85),rgba(9,11,14,0.96))] px-6 py-10 text-center shadow-panel-soft sm:px-12 sm:py-14">
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Take Korean with you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Built for real-life moments in Korea and everyday practice in between.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-warm/70 bg-warm/20 px-5 py-3 text-sm font-medium text-warm transition hover:bg-warm/30"
            >
              Download on the App Store
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              <ArrowUp size={15} />
              Back to top
            </a>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

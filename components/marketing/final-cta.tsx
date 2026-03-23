import { ArrowUp } from "lucide-react";
import { SectionShell } from "@/components/marketing/section-shell";
import { appStoreUrl } from "@/lib/marketing-content";
import Image from "next/image";

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg";

export function FinalCta() {
  return (
    <section id="download" className="relative border-t border-white/10 py-20 sm:py-24">
      <SectionShell>
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/5 bg-[linear-gradient(160deg,rgba(68,71,110,0.9),rgba(146,95,89,0.88))] backdrop-blur-xl px-6 py-10 text-center shadow-panel-soft sm:px-12 sm:py-14">
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Take Korean with you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Built for real-life moments in Korea and everyday practice in between.
          </p>

          <div className="mt-8 flex inline-flex items-center justify-center gap-3">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="mx-auto inline-flex"
              aria-label={`Download Jinjja from the App Store`}
            >
              <p className="text-black text-md text-center font-semibold bg-white border border-black/70 rounded-md px-3 py-2 shadow-lg">iOS App Available Soon!</p>
              <Image
                src={appStoreBadgeSrc}
                alt="Download on the App Store"
                width={180}
                height={60}
                className="hidden h-11 w-auto"
              />
            </a>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}


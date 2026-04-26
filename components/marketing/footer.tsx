import Link from "next/link";
import Image from "next/image";
import { SectionShell } from "@/components/marketing/section-shell";
import { footerLinkSections } from "@/lib/marketing-content";
import { appStoreUrl } from "@/lib/site-config";

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";

export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-[linear-gradient(180deg,#FFFFFF,#F7F9FC)] py-10 sm:py-14">
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-3">
              <Image
                src="/marketing/app/jjin-logo.svg"
                alt="Jjin"
                width={112}
                height={66}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-sm leading-6 text-neutral-700 sm:text-base">
              Practical Korean for real-life conversations, travel moments,
              listening practice, and everyday confidence in Korea.
            </p>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex transition hover:opacity-90"
              aria-label="Download Jjin from the App Store"
            >
              <Image
                src={appStoreBadgeSrc}
                alt="Download on the App Store"
                width={180}
                height={60}
                className="h-11 w-auto"
              />
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr]">
            {footerLinkSections.map((section) => (
              <nav key={section.title} aria-label={section.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-950">
                  {section.title}
                </h2>
                <div
                  className={
                    section.title === "Learn Korean"
                      ? "mt-4 grid grid-cols-2 gap-x-5 gap-y-3"
                      : "mt-4 grid gap-3"
                  }
                >
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm leading-5 text-neutral-700 transition hover:text-neutral-950"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}

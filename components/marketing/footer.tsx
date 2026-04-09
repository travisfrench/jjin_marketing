import Link from "next/link";
import Image from "next/image";
import { SectionShell } from "@/components/marketing/section-shell";
import { footerLinks } from "@/lib/marketing-content";
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
              <p className="font-korean text-2xl font-black text-[#CD2E3A]">
                Jjin
              </p>
              <Image
                src="/marketing/hero/south-korea-flag.png"
                alt="Flag of South Korea"
                width={40}
                height={20}
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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-700 transition hover:text-neutral-950"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}

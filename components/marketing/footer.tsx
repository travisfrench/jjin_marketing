import Link from "next/link";
import Image from "next/image";
import { SectionShell } from "@/components/marketing/section-shell";
import { appStoreUrl, footerLinks } from "@/lib/marketing-content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <SectionShell>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center mb-3 gap-3">

            <p className="font-korean text-2xl font-black text-[#CD2E3A]">
              Jinjja
            </p>
            <Image src="/marketing/hero/south-korea-flag.png" alt="Flag of South Korea" width={40} height={20} />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">

            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-neutral-800/75 transition hover:text-neutral-800">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}

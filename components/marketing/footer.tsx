import Link from "next/link";
import { SectionShell } from "@/components/marketing/section-shell";
import { appStoreUrl, footerLinks } from "@/lib/marketing-content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <SectionShell>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-korean text-lg font-black text-foreground">Jinjja</p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="text-warm transition hover:text-[#f1bd84]"
            >
              App Store
            </a>
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/75 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}

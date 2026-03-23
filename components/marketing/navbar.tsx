"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { appStoreUrl, navigationLinks } from "@/lib/marketing-content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border border-white/10 bg-white/20 backdrop-blur"
            : ""
        }`}
      >
        <Link
          href="/"
          className="font-korean font-black text-xl tracking-wide text-black/80"
          aria-label="Jinjja home"
        >
          Jinjja
        </Link>

        <nav className="items-center gap-7 md:flex" aria-label="Primary">
          {navigationLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-black/80 transition hover:text-black"
            >
              {item.label}
            </a>
          ))}
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-neutral-700/60 bg-warm/20 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-warm hover:bg-warm/30"
          >
            Download
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="mx-auto mt-3 flex w-full max-w-6xl flex-col gap-2 rounded-2xl border border-white/15 bg-black/75 p-4 backdrop-blur-xl md:hidden"
          aria-label="Mobile primary"
        >
          {navigationLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-white/85 transition hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 rounded-lg border border-warm/50 bg-warm/20 px-3 py-2 text-sm font-medium text-warm"
          >
            Download
          </a>
        </nav>
      ) : null}
    </header>
  );
}

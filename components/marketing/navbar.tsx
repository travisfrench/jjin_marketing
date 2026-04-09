"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { appStoreUrl, navigationLinks } from "@/lib/marketing-content";
import { FaApple } from "react-icons/fa";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-2 sm:px-4 pt-2 sm:px-8">
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border border-white/10 bg-white/20 backdrop-blur"
            : "border border-transparent"
        }`}
      >
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="Jjin home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/marketing/app/jjin-logo.svg"
            alt="Jjin"
            width={96}
            height={56}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-black/80 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex justify-center items-center gap-2 rounded-full border border-blue-700/60 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500/80"
          >
            Download<FaApple />
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white/75 text-black/80 shadow-sm backdrop-blur transition hover:bg-white md:hidden"
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
          className="mx-auto mt-3 flex w-full max-w-6xl flex-col gap-2 rounded-2xl border border-neutral-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
          aria-label="Mobile primary"
        >
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-neutral-800 transition hover:bg-neutral-100"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg border border-warm/50 bg-warm/20 px-3 py-2 text-sm font-medium text-neutral-800"
          >
            Download
          </a>
        </nav>
      ) : null}
    </header>
  );
}

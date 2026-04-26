"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  appStoreUrl,
  navigationLinks,
  phraseCategoryLinks,
} from "@/lib/marketing-content";
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
          {navigationLinks.map((item) =>
            item.href === "/korean-phrases" ? (
              <div key={item.href} className="group relative py-3">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm text-black/80 transition hover:text-black"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 w-64 rounded-2xl border border-black/10 bg-white/95 p-3 opacity-0 shadow-xl backdrop-blur-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <Link
                    href="/korean-phrases"
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
                  >
                    All phrases
                  </Link>
                  <div className="my-2 h-px bg-black/8" />
                  <div className="grid grid-cols-2 gap-1">
                    {phraseCategoryLinks.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="rounded-lg px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-black/80 transition hover:text-black"
              >
                {item.label}
              </Link>
            ),
          )}
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
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2 text-sm text-neutral-800 transition hover:bg-neutral-100"
              >
                {item.label}
              </Link>
              {item.href === "/korean-phrases" ? (
                <div className="ml-3 grid grid-cols-2 gap-1 border-l border-neutral-200 pl-3">
                  {phraseCategoryLinks.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-2 py-1.5 text-sm text-neutral-600 transition hover:bg-neutral-100"
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
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

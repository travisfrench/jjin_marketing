"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { howItWorksItems } from "@/lib/marketing-content";
import { SectionShell } from "@/components/marketing/section-shell";

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative border-t border-black/8 bg-[linear-gradient(180deg,#FFFFFF,#F7F9FC)] py-20 sm:py-24"
    >
      <SectionShell>
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
            How Jjin works
          </p>
          <h2 className="font-heading text-3xl font-semibold text-neutral-950 sm:text-4xl lg:text-5xl">
            A cleaner learning loop for useful Korean
          </h2>
          <p className="text-base text-neutral-700 sm:text-lg">
            Jjin pairs listening, readable Hangul, and practical phrase sets so
            study stays close to the situations that actually matter.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {howItWorksItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="rounded-[1.9rem] border border-black/10 bg-white/80 p-6 text-left shadow-[0_22px_60px_rgba(15,23,42,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#2253D9]">
                {item.stat}
              </p>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-neutral-500">
          Designed around short, repeatable study loops instead of broad lesson
          filler.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/korean-phrases"
            className="inline-flex items-center gap-2 rounded-full border border-[#2253D9]/20 bg-[#EEF4FF] px-5 py-3 text-sm font-semibold text-[#2253D9] transition hover:border-[#2253D9]/40 hover:bg-[#E2EBFF]"
          >
            Try the phrase library
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/learn-hangul"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-black/20 hover:bg-neutral-50"
          >
            Practice Hangul basics
          </Link>
        </div>
      </SectionShell>
    </section>
  );
}

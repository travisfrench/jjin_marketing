"use client";

import { motion, useReducedMotion } from "framer-motion";
import { howItWorksItems } from "@/lib/marketing-content";
import { SectionShell } from "@/components/marketing/section-shell";

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="relative border-t border-white/10 bg-[#F0E4D9] py-20 sm:py-24">
      <SectionShell>
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-800/70">Why audio + reading works</p>
          <h2 className="font-heading text-3xl font-semibold text-neutral-800 sm:text-4xl lg:text-5xl">
            Listening while reading drives stronger retention
          </h2>
          <p className="text-base text-neutral-600 sm:text-lg">
            Seeing Hangul and hearing pronunciation together builds memory faster than reading alone.
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
              className="rounded-2xl border border-white/15 bg-[linear-gradient(160deg,rgba(16,20,27,0.9),rgba(8,10,14,0.96))] p-6 text-center shadow-panel-soft"
            >
              <p className="font-heading text-5xl font-semibold leading-none text-warm sm:text-6xl">
                {item.stat}
              </p>
              <h3 className="mt-5 font-heading text-2xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-neutral-800/50">
          Based on internal Jinjja beta learning sessions.
        </p>
      </SectionShell>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "@/components/marketing/section-shell";
import { appScreens } from "@/lib/marketing-content";

export function AppScreensStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-[#C9BBAE] border-t border-white/10 py-20 sm:py-24">
      <SectionShell>
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-800/70">Inside the app</p>
          <h2 className="font-heading text-3xl font-semibold text-neutral-800 sm:text-4xl">
            Built to feel fast, focused, and easy to use
          </h2>
          <p className="text-base text-neutral-800/70 sm:text-lg">
            No clutter. Just the phrases you need, when you need them.
          </p>
        </div>

        <div className="-mx-5 mt-12 overflow-x-auto px-5 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <div className="flex w-max snap-x snap-mandatory gap-4 sm:grid sm:w-auto sm:grid-cols-2 lg:grid-cols-4">
          {appScreens.map((screen, index) => (
            <motion.figure
              key={screen.src}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="group w-[72vw] max-w-[18rem] flex-none snap-start overflow-hidden rounded-[1.8rem] border border-white/15 bg-[linear-gradient(180deg,rgba(11,15,20,0.95),rgba(6,8,10,0.95))] p-2 shadow-panel-soft sm:w-auto sm:max-w-none sm:flex-auto"
            >
              <div className="relative aspect-[9/19.2] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#07090c]">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 22vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="px-2 pb-2 pt-3 text-sm text-white/75">
                {screen.title}
              </figcaption>
            </motion.figure>
          ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

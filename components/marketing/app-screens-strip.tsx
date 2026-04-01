"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "@/components/marketing/section-shell";
import { appScreens } from "@/lib/marketing-content";

export function AppScreensStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-black/8 bg-white py-20 sm:py-24">
      <SectionShell>
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
            Inside the app
          </p>
          <h2 className="font-heading text-3xl font-semibold text-neutral-950 sm:text-4xl">
            Built for useful Korean, not cluttered lessons
          </h2>
          <p className="text-base text-neutral-700 sm:text-lg">
            Browse practical categories, study phrase cards, review with audio,
            and keep Hangul support close to the lesson flow.
          </p>
        </div>

        <div className="-mx-5 mt-12 overflow-x-auto overflow-y-clip px-5 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
          <div className="flex w-max snap-x snap-mandatory gap-4 sm:grid sm:w-auto sm:grid-cols-2 lg:grid-cols-5">
          {appScreens.map((screen, index) => (
            <motion.figure
              key={screen.src}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="group w-[64vw] max-w-[18rem] flex-none snap-start overflow-hidden rounded-[1.8rem] border border-black/10 bg-[linear-gradient(180deg,#FFFFFF,#F7F9FC)] p-2 shadow-[0_22px_60px_rgba(15,23,42,0.06)] sm:w-auto sm:max-w-none sm:flex-auto"
            >
              <div className="relative aspect-[9/19.2] overflow-hidden rounded-[1.35rem] border border-black/8 bg-[#F5F7FB]">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 22vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="px-2 pb-2 pt-3">
                <p className="text-sm font-medium text-neutral-900">{screen.title}</p>
              </figcaption>
            </motion.figure>
          ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

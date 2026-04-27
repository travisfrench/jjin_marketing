import Link from "next/link";
import { ArrowRight, Headphones, Layers, Repeat2 } from "lucide-react";
import { SectionShell } from "@/components/marketing/section-shell";

const flowItems = [
  {
    title: "Hear the phrase first",
    description:
      "Phrase pages preview the audio-first loop in Jjin: listen, read the Hangul, and keep the meaning close.",
    icon: Headphones,
    href: "/korean-listening-practice",
    cta: "See listening practice",
  },
  {
    title: "Keep it in a useful set",
    description:
      "Categories keep Korean tied to real situations like cafes, transit, hotels, restaurants, and courtesy.",
    icon: Layers,
    href: "/korean-phrases",
    cta: "Browse phrase sets",
  },
  {
    title: "Review it again in the app",
    description:
      "Jjin is built around short repeatable study loops so useful Korean is easier to revisit later.",
    icon: Repeat2,
    href: "/korean-learning-app",
    cta: "How Jjin works",
  },
];

export function PhraseLearningFlowSection({
  title = "From phrase preview to app practice",
  description = "The web pages help you find useful Korean. The app keeps the learning loop together with audio, Hangul, meaning, and quick review.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-b border-black/8 py-20 sm:py-24">
      <SectionShell>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
            Inside the learning flow
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {flowItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.09)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2253D9]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-semibold text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2253D9]">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </SectionShell>
    </section>
  );
}

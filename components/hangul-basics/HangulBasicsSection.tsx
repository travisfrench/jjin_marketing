import { HangulBasicsWidget } from "@/components/hangul-basics/HangulBasicsWidget";
import { SectionShell } from "@/components/marketing/section-shell";

export function HangulBasicsSection() {
  return (
    <section className="relative border-b border-black/8 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(190,112,86,0.12),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(34,83,217,0.08),transparent_30%)]" />
      <SectionShell>
        <div className="relative grid gap-10 lg:grid-cols-10 lg:items-end">
          <div className="max-w-2xl lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
              Interactive Hangul chart
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              Learn Korean consonants and vowels by hearing the syllables they make
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg">
              Hangul becomes easier to read when the letters are paired into real
              Korean syllable blocks. Choose a consonant to hear it with every
              vowel, or choose a vowel to hear every consonant match.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 lg:col-span-4">
            {["가", "거", "고", "구", "그", "기", "나", "너", "노", "누", "느", "니"].map(
              (syllable) => (
                <span
                  key={syllable}
                  className="flex aspect-square items-center justify-center rounded-2xl bg-white font-korean text-2xl font-black text-neutral-950 sm:text-4xl"
                >
                  {syllable}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative mt-12">
          <HangulBasicsWidget />
        </div>
      </SectionShell>
    </section>
  );
}

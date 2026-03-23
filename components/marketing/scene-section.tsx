"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { SceneContent, appStoreUrl } from "@/lib/marketing-content";
import { SectionShell } from "@/components/marketing/section-shell";
import { StudyCard } from "@/components/marketing/study-card";

type SceneSectionProps = {
  scenes: SceneContent[];
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const sceneLayerOpacity = (sceneOffset: number) => {
  // sceneOffset is centered on each scene:
  // -0.5 = scene just entered, 0 = scene center, +0.5 = scene about to exit
  const phase = sceneOffset + 0.5;
  if (phase <= 0 || phase >= 1) return 0;

  // Gap -> quick fade in -> plateau -> quick fade out -> gap
  const revealStart = 0.2;
  const revealEnd = 0.3;
  const hideStart = 0.72;
  const hideEnd = 0.84;

  if (phase < revealStart) return 0;
  if (phase < revealEnd) {
    const t = clamp((phase - revealStart) / (revealEnd - revealStart));
    return smoothstep(t);
  }
  if (phase <= hideStart) return 1;
  if (phase < hideEnd) {
    const t = clamp((phase - hideStart) / (hideEnd - hideStart));
    return 1 - smoothstep(t);
  }

  return 0;
};

const appStoreBadgeSrc =
  "/marketing/app/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg";

export function SceneSection({ scenes }: SceneSectionProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  const steps = Math.max(scenes.length - 1, 1);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setSceneProgress(latest * steps);
  });

  if (!scenes.length) return null;

  if (reduceMotion) {
    return (
      <div id="scenes" className="border-y border-white/10">
        {scenes.map((scene) => (
          <section
            key={scene.id}
            className="relative min-h-dvh overflow-hidden"
            aria-label={`${scene.label} learning scene`}
          >
            <Image
              src={scene.image}
              alt={`${scene.label} environment in Korea`}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(205,196,174,0.38),rgba(228,221,208,0.07)_28%,rgba(145,138,117,0.21))]" />

            <SectionShell className="relative z-10 flex min-h-dvh items-center justify-center py-16">
              <div className="flex w-full max-w-4xl flex-col items-center gap-8 text-center">
                <StudyCard
                  variant="scene"
                  label={scene.label}
                  phrase={scene.phrase}
                  romanization={scene.romanization}
                  meaning={scene.meaning}
                  audioSrc={scene.audio}
                  pills={["Situation", "Phrase", "Confidence"]}
                />
                <div className="max-w-3xl space-y-3">
                  <p className="text-sm uppercase tracking-[0.15em] text-white/80">{scene.label}</p>
                  <h2 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                    {scene.title}
                  </h2>
                  <p className="text-lg text-white/85 sm:text-xl">{scene.copy}</p>
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mx-auto mt-4 inline-flex"
                    aria-label={`Download Jinjja from the App Store for ${scene.label}`}
                  >
                    <p className="text-black text-md text-center font-semibold bg-white border border-black/70 rounded-md px-3 py-2 shadow-lg">iOS App Available Soon!</p>
                    <Image
                      src={appStoreBadgeSrc}
                      alt="Download on the App Store"
                      width={180}
                      height={60}
                      className="hidden h-11 w-auto"
                    />
                  </a>
                </div>
              </div>
            </SectionShell>
          </section>
        ))}
      </div>
    );
  }

  return (
    <section
      id="scenes"
      ref={containerRef}
      className="relative"
      style={{ height: `${scenes.length * 100}dvh` }}
      aria-label="Real-life Korean scene sequence"
    >
      <div className="sticky top-0 h-dvh overflow-hidden border-y border-white/5">
        <div className="absolute inset-0">
          {scenes.map((scene, index) => {
            const intensity = clamp(1 - Math.abs(sceneProgress - index));
            const opacity = clamp((intensity - 0.08) / 0.92);

            return (
              <div
                key={scene.id}
                className="absolute inset-0"
                style={{ opacity }}
                aria-hidden={opacity < 0.1}
              >
                <Image
                  src={scene.image}
                  alt={`${scene.label} environment in Korea`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,7,0.18),rgba(5,6,7,0.50)_70%,rgba(5,6,7,0.11))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.15),transparent_42%)] mix-blend-soft-light" />

        {scenes.map((scene, index) => {
          const intensity = clamp(1 - Math.abs(sceneProgress - index));
          const sceneOffset = sceneProgress - index;
          const baseOpacity = sceneLayerOpacity(sceneOffset);
          const firstSceneIntroOpacity = clamp(sceneProgress / 0.045);
          const opacity =
            index === 0 ? baseOpacity * firstSceneIntroOpacity : baseOpacity;
          const y = (index - sceneProgress) * 54;
          const scale = 0.97 + intensity * 0.03;
          const isActive = opacity > 0.3;

          return (
            <div
              key={scene.id}
              className="absolute inset-0 flex items-center"
              style={{
                opacity,
                transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <SectionShell className="relative z-10 flex h-full items-center justify-center py-12">
                <div className="flex w-full max-w-4xl flex-col items-center gap-8 text-center">
                  <StudyCard
                    variant="scene"
                    label={scene.label}
                    phrase={scene.phrase}
                    romanization={scene.romanization}
                    meaning={scene.meaning}
                    audioSrc={scene.audio}
                    audioLabel={`Play ${scene.label} phrase audio`}
                    isActive={isActive}
                    pills={["Situation", "Phrase", "Confidence"]}
                    className="mx-auto"
                  />

                  <div className="max-w-3xl space-y-3">
                    <p className="inline-flex rounded-full border border-white/20 bg-white/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-neutral-800">{scene.label}</p>
                    <h2 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                      {scene.title}
                    </h2>
                    <p className="text-lg text-white/85 sm:text-2xl">{scene.copy}</p>
                    <a
                      href={appStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-auto mt-4 inline-flex"
                      aria-label={`Download Jinjja from the App Store for ${scene.label}`}
                    >
                      <p className="text-black text-md text-center font-semibold bg-white border border-black/70 rounded-md px-3 py-2 shadow-lg">iOS App Available Soon!</p>
                      <Image
                        src={appStoreBadgeSrc}
                        alt="Download on the App Store"
                        width={180}
                        height={60}
                        className="hidden h-11 w-auto mt-6"
                      />
                    </a>
                  </div>
                </div>
              </SectionShell>
            </div>
          );
        })}
      </div>
    </section>
  );
}

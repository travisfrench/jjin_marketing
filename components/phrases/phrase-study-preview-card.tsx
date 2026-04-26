"use client";

import { Play, RotateCcw, Square } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  PhraseAudioSource,
  PhraseAudioVariant,
  PhraseTimingData,
  PhraseTimingSyllable,
} from "@/lib/phrases/types";

type PhraseStudyPreviewCardProps = {
  category: string;
  koreanText: string;
  englishText: string;
  romanization: string;
  audioSources: PhraseAudioSource[];
  normalTimingUrl?: string | null;
  slowTimingUrl?: string | null;
};

type StudyPhase = "ready" | "listen" | "practice" | "use";
type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

const phaseLabels: Record<StudyPhase, string> = {
  ready: "Listen",
  listen: "Listen",
  practice: "Practice break",
  use: "Repeat",
};

function splitHangul(text: string) {
  return Array.from(text);
}

function findActiveSyllable(
  syllables: PhraseTimingSyllable[] | undefined,
  currentMs: number,
) {
  if (!syllables?.length) return -1;
  return syllables.findIndex(
    (syllable) => currentMs >= syllable.startMs && currentMs <= syllable.endMs,
  );
}

export function PhraseStudyPreviewCard({
  koreanText,
  englishText,
  romanization,
  audioSources,
  normalTimingUrl,
  slowTimingUrl,
}: PhraseStudyPreviewCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sequenceTokenRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const audioDurationMsRef = useRef<Record<PhraseAudioVariant, number | null>>({
    normal: null,
    slow: null,
  });
  const timingDataRef = useRef<Record<PhraseAudioVariant, PhraseTimingData | null>>({
    normal: null,
    slow: null,
  });
  const [variant, setVariant] = useState<PhraseAudioVariant>("normal");
  const [phase, setPhase] = useState<StudyPhase>("ready");
  const [passIndex, setPassIndex] = useState(0);
  const [currentMs, setCurrentMs] = useState(0);
  const [timings, setTimings] = useState<Record<PhraseAudioVariant, PhraseTimingData | null>>({
    normal: null,
    slow: null,
  });

  const selectedAudio = audioSources.find((source) => source.variant === variant);
  const fallbackAudio = audioSources[0];
  const activeAudio = selectedAudio ?? fallbackAudio;
  const activeVariant = activeAudio?.variant ?? variant;
  const activeTiming = timings[activeVariant] ?? timingDataRef.current[activeVariant];
  const syllables = activeTiming?.syllables;
  const hangulUnits = useMemo(() => splitHangul(koreanText), [koreanText]);
  const activeSyllableIndex = findActiveSyllable(syllables, currentMs);
  const isRunning = phase !== "ready";

  useEffect(() => {
    return () => cancelKaraokeFrame();
  }, []);

  function cancelKaraokeFrame() {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }

  async function loadTimings(nextVariant: PhraseAudioVariant) {
    if (timingDataRef.current[nextVariant]) return timingDataRef.current[nextVariant];
    if (timings[nextVariant]) return timings[nextVariant];

    const timingUrl = nextVariant === "slow" ? slowTimingUrl : normalTimingUrl;
    if (!timingUrl) return null;

    try {
      const response = await fetch(timingUrl);
      if (!response.ok) return null;
      const data = (await response.json()) as PhraseTimingData;
      timingDataRef.current[nextVariant] = data;
      setTimings((current) => ({ ...current, [nextVariant]: data }));
      return data;
    } catch {
      return null;
    }
  }

  async function loadAudioDuration(nextVariant: PhraseAudioVariant) {
    if (audioDurationMsRef.current[nextVariant]) {
      return audioDurationMsRef.current[nextVariant];
    }

    const source =
      audioSources.find((item) => item.variant === nextVariant) ?? audioSources[0];
    if (!source?.src) return null;

    try {
      const response = await fetch(source.src);
      if (!response.ok) return null;

      const audioContextConstructor =
        window.AudioContext ??
        (window as WindowWithWebkitAudio).webkitAudioContext;
      if (!audioContextConstructor) return null;

      const audioContext = new audioContextConstructor();
      const arrayBuffer = await response.arrayBuffer();
      const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);
      await audioContext.close();

      const durationMs = decodedAudio.duration * 1000;
      audioDurationMsRef.current[nextVariant] = durationMs;
      return durationMs;
    } catch {
      return null;
    }
  }

  function wait(ms: number) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async function playOnce(token: number) {
    const playVariant = activeVariant;
    await loadAudioDuration(playVariant);

    return new Promise<void>((resolve) => {
      const audio = audioRef.current;
      if (!audio || !activeAudio?.src || token !== sequenceTokenRef.current) {
        resolve();
        return;
      }

      audio.currentTime = 0;
      setCurrentMs(0);

      const cleanup = () => {
        cancelKaraokeFrame();
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleEnded);
      };

      const handleEnded = () => {
        const timingDurationMs = timingDataRef.current[playVariant]?.durationMs;
        if (timingDurationMs) setCurrentMs(timingDurationMs);
        cleanup();
        resolve();
      };

      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleEnded);
      audio.play().then(() => {
        startKaraokeClock(token, playVariant);
      }).catch(() => {
        cleanup();
        resolve();
      });
    });
  }

  function getSyncedCurrentMs(
    audio: HTMLAudioElement,
    syncVariant: PhraseAudioVariant,
  ) {
    const currentAudioMs = audio.currentTime * 1000;
    const decodedDurationMs = audioDurationMsRef.current[syncVariant];
    const measuredDurationMs =
      decodedDurationMs ??
      (Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration * 1000
        : null);
    const timingDurationMs = timingDataRef.current[syncVariant]?.durationMs;

    if (!measuredDurationMs || !timingDurationMs) return currentAudioMs;

    return Math.min(
      timingDurationMs,
      Math.max(0, (currentAudioMs / measuredDurationMs) * timingDurationMs),
    );
  }

  function startKaraokeClock(token: number, syncVariant: PhraseAudioVariant) {
    cancelKaraokeFrame();

    const tick = () => {
      const audio = audioRef.current;
      if (!audio || token !== sequenceTokenRef.current || audio.paused || audio.ended) {
        animationFrameRef.current = null;
        return;
      }

      setCurrentMs(getSyncedCurrentMs(audio, syncVariant));
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
  }

  function rememberAudioDuration(
    audio: HTMLAudioElement,
    nextVariant: PhraseAudioVariant,
  ) {
    if (audioDurationMsRef.current[nextVariant]) return;

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audioDurationMsRef.current[nextVariant] = audio.duration * 1000;
    }
  }

  async function runStudySequence(restart = false) {
    if (!activeAudio?.src || (isRunning && !restart)) return;

    if (restart) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setPhase("ready");
      setPassIndex(0);
      setCurrentMs(0);
    }

    const token = sequenceTokenRef.current + 1;
    sequenceTokenRef.current = token;
    await Promise.all([
      loadTimings(activeVariant),
      loadAudioDuration(activeVariant),
    ]);

    setPhase("listen");
    for (let index = 0; index < 3; index += 1) {
      if (sequenceTokenRef.current !== token) return;
      setPassIndex(index + 1);
      await playOnce(token);
      await wait(240);
    }

    if (sequenceTokenRef.current !== token) return;
    setPhase("practice");
    setPassIndex(0);
    setCurrentMs(0);
    await wait(3750);

    setPhase("use");
    for (let index = 0; index < 2; index += 1) {
      if (sequenceTokenRef.current !== token) return;
      setPassIndex(index + 1);
      await playOnce(token);
      await wait(240);
    }

    if (sequenceTokenRef.current === token) {
      setPhase("ready");
      setPassIndex(0);
      setCurrentMs(0);
    }
  }

  function stopSequence() {
    sequenceTokenRef.current += 1;
    cancelKaraokeFrame();
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setPhase("ready");
    setPassIndex(0);
    setCurrentMs(0);
  }

  const cardGlow =
    phase === "practice"
      ? "shadow-[0_0_0_2px_rgba(205,46,58,0.18),0_0_0_6px_rgba(0,71,160,0.12),0_34px_90px_rgba(15,23,42,0.16)] bg-white/40 rounded-2xl backdrop-blur-sm"
      : "bg-white/40 rounded-2xl backdrop-blur-sm";

  return (
    <article
      className={`relative mx-auto w-full max-w-[27rem] overflow-hidden rounded-[2.4rem] py-6 text-center text-neutral-950 ${cardGlow} transition-shadow duration-500`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-[2.4rem] opacity-0 transition-opacity duration-500 ${
          phase === "practice" ? "opacity-100" : ""
        }`}
      >

      </div>

      {activeAudio?.src ? (
        <audio
          ref={audioRef}
          src={activeAudio.src}
          preload="metadata"
          onLoadedMetadata={(event) =>
            rememberAudioDuration(event.currentTarget, activeVariant)
          }
          onDurationChange={(event) =>
            rememberAudioDuration(event.currentTarget, activeVariant)
          }
          onTimeUpdate={(event) =>
            setCurrentMs(getSyncedCurrentMs(event.currentTarget, activeVariant))
          }
          onEnded={() => {
            const timingDurationMs = timingDataRef.current[activeVariant]?.durationMs;
            if (timingDurationMs) setCurrentMs(timingDurationMs);
          }}
        />
      ) : null}

      <div className="relative">

        <p className="font-heading text-sm uppercase tracking-widest text-neutral-500">
          {phaseLabels[phase]}
          {phase === "listen" ? ` ${passIndex}/3` : ""}
          {phase === "use" ? ` ${passIndex}/2` : ""}
        </p>

        <p className="mt-12 text-2xl font-semibold text-neutral-600">
          {romanization}
        </p>

        <div className="mt-8 min-h-[5.8rem] font-korean text-5xl font-black leading-tight tracking-normal sm:text-6xl">
          {hangulUnits.map((unit, index) => {
            const isActive =
              activeSyllableIndex === index ||
              (!syllables?.length && isRunning && phase !== "practice");

            return (
              <span
                key={`${unit}-${index}`}
                className={`transition-colors duration-150 ${
                  isActive ? "text-[#C56D5C]" : "text-neutral-950/42"
                }`}
              >
                {unit}
              </span>
            );
          })}
        </div>

        <p className="mt-2 text-3xl font-semibold tracking-normal text-neutral-950">
          {englishText}
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={stopSequence}
            disabled={!activeAudio?.src || !isRunning}
            className="inline-flex h-16 w-28 items-center justify-center rounded-[2rem] bg-neutral-950 text-white shadow-[0_16px_36px_rgba(15,23,42,0.16)] transition hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400"
            aria-label="Stop practice preview"
          >
            <Square className="h-5 w-5 fill-current" />
          </button>
          <button
            type="button"
            onClick={() => void runStudySequence(isRunning)}
            disabled={!activeAudio?.src}
            className="inline-flex h-16 w-28 items-center justify-center rounded-[2rem] bg-neutral-950/5 text-[#C56D5C] transition hover:bg-neutral-950/8 disabled:text-neutral-300"
            aria-label={isRunning ? "Restart practice preview" : "Start practice preview"}
          >
            {isRunning ? <RotateCcw className="h-7 w-7" /> : <Play className="h-6 w-6 fill-current" />}
          </button>
        </div>

        <div className="mt-8 max-w-64 mx-auto flex items-center justify-between">
          {(["slow", "normal"] as PhraseAudioVariant[]).map((option) => {
            const hasAudio = audioSources.some((source) => source.variant === option);
            const active = activeVariant === option;

            return (
              <button
                key={option}
                type="button"
                disabled={!hasAudio || isRunning}
                onClick={() => setVariant(option)}
                className={`inline-flex items-center gap-2 text-sm font-bold capitalize transition bg-white/30 px-3 py-1 rounded-full ${
                  active ? "text-neutral-950" : "text-neutral-500"
                } disabled:text-neutral-300`}
              >
                {option}
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    active ? "bg-[#34C759]" : "bg-black/10 border-black/30 border"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="mt-10 text-sm font-semibold text-neutral-600">
          Listen. Repeat. Use.
        </p>
      </div>
    </article>
  );
}

"use client";

import { ArrowRightLeft, Loader2, Play, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/components/hangul-basics/HangulBasicsWidget.module.css";
import {
  getHangulBasicsAudioUrl,
  publishedSymbols,
  fallbackConsonants,
  fallbackVowels,
} from "@/components/hangul-basics/hangul";
import type {
  HangulBasicsItem,
  HangulLearningPath,
  HangulSymbolEntry,
} from "@/components/hangul-basics/types";
import { useHangulBasicsManifest } from "@/components/hangul-basics/useHangulBasicsManifest";

const pathCopy: Record<
  HangulLearningPath,
  { title: string; subtitle: string; pickerLabel: string }
> = {
  consonant: {
    title: "Consonant",
    subtitle: "One consonant paired with all vowels.",
    pickerLabel: "Choose a consonant",
  },
  vowel: {
    title: "Vowel",
    subtitle: "One vowel paired with all consonants.",
    pickerLabel: "Choose a vowel",
  },
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function nextSymbol(symbols: HangulSymbolEntry[], currentSymbol: string) {
  const currentIndex = symbols.findIndex((item) => item.symbol === currentSymbol);
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % symbols.length : 0;
  return symbols[nextIndex]?.symbol ?? currentSymbol;
}

export function HangulBasicsWidget() {
  const { manifest, isLoading, error } = useHangulBasicsManifest();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayTokenRef = useRef(0);
  const [learningPath, setLearningPath] =
    useState<HangulLearningPath>("consonant");
  const [selectedConsonant, setSelectedConsonant] = useState("ㄱ");
  const [selectedVowel, setSelectedVowel] = useState("ㅏ");
  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);
  const [isAutoplaying, setIsAutoplaying] = useState(false);

  const consonants = useMemo(
    () => publishedSymbols(manifest.consonants, fallbackConsonants),
    [manifest.consonants],
  );
  const vowels = useMemo(
    () => publishedSymbols(manifest.vowels, fallbackVowels),
    [manifest.vowels],
  );

  useEffect(() => {
    setSelectedConsonant((current) =>
      consonants.some((item) => item.symbol === current)
        ? current
        : consonants[0]?.symbol ?? "ㄱ",
    );
  }, [consonants]);

  useEffect(() => {
    setSelectedVowel((current) =>
      vowels.some((item) => item.symbol === current)
        ? current
        : vowels[0]?.symbol ?? "ㅏ",
    );
  }, [vowels]);

  useEffect(() => {
    return () => stopPlayback();
  }, []);

  const visibleItems = useMemo(() => {
    return manifest.items.filter((item) =>
      learningPath === "consonant"
        ? item.consonant === selectedConsonant
        : item.vowel === selectedVowel,
    );
  }, [learningPath, manifest.items, selectedConsonant, selectedVowel]);

  const selectionSymbols = learningPath === "consonant" ? consonants : vowels;
  const selectedBaseSymbol =
    learningPath === "consonant" ? selectedConsonant : selectedVowel;
  const consonantRomanizationBySymbol = useMemo(
    () =>
      new Map(
        consonants.map((item) => [item.symbol, item.romanization || item.symbol]),
      ),
    [consonants],
  );
  const vowelRomanizationBySymbol = useMemo(
    () =>
      new Map(vowels.map((item) => [item.symbol, item.romanization || item.symbol])),
    [vowels],
  );
  const promptSymbol =
    learningPath === "consonant" ? selectedConsonant : selectedVowel;

  function stopPlayback() {
    autoplayTokenRef.current += 1;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    setActivePlaybackId(null);
    setIsAutoplaying(false);
  }

  async function playItem(item: HangulBasicsItem, token = autoplayTokenRef.current) {
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;
    audio.pause();
    audio.currentTime = 0;
    audio.src = getHangulBasicsAudioUrl(item.audioPath);
    setActivePlaybackId(item.id);

    return new Promise<void>((resolve) => {
      const cleanup = () => {
        audio.removeEventListener("ended", handleDone);
        audio.removeEventListener("error", handleDone);
      };

      const handleDone = () => {
        cleanup();
        if (autoplayTokenRef.current === token) {
          setActivePlaybackId(null);
        }
        resolve();
      };

      audio.addEventListener("ended", handleDone);
      audio.addEventListener("error", handleDone);
      audio.play().catch(handleDone);
    });
  }

  function handlePathChange(nextPath: HangulLearningPath) {
    stopPlayback();
    setLearningPath(nextPath);
  }

  function handleSymbolSelect(symbol: string) {
    stopPlayback();
    if (learningPath === "consonant") {
      setSelectedConsonant(symbol);
    } else {
      setSelectedVowel(symbol);
    }
  }

  function handleNext() {
    stopPlayback();
    if (learningPath === "consonant") {
      setSelectedConsonant(nextSymbol(consonants, selectedConsonant));
    } else {
      setSelectedVowel(nextSymbol(vowels, selectedVowel));
    }
  }

  function handleSwitchPath() {
    handlePathChange(learningPath === "consonant" ? "vowel" : "consonant");
  }

  async function handleAutoplay() {
    if (isAutoplaying) {
      stopPlayback();
      return;
    }

    const queue = visibleItems;
    if (!queue.length) return;

    const token = autoplayTokenRef.current + 1;
    autoplayTokenRef.current = token;
    setIsAutoplaying(true);

    for (const item of queue) {
      if (autoplayTokenRef.current !== token) return;
      await playItem(item, token);
      if (autoplayTokenRef.current !== token) return;
      await wait(420);
    }

    if (autoplayTokenRef.current === token) {
      setIsAutoplaying(false);
      setActivePlaybackId(null);
    }
  }

  function handleTilePlay(item: HangulBasicsItem) {
    autoplayTokenRef.current += 1;
    setIsAutoplaying(false);
    void playItem(item, autoplayTokenRef.current);
  }

  return (
    <div className={styles.widget}>
      <div className="grid gap-0 lg:grid-cols-[0.86fr,1.14fr]">
        <div className="border-b border-black/8 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                Hangul Basics
              </p>
              <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-neutral-950">
                Pick one consonant or vowel, then hear every match.
              </h3>
            </div>
            {isLoading && (
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-neutral-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading audio
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(["consonant", "vowel"] as const).map((path) => {
              const selected = learningPath === path;
              return (
                <button
                  key={path}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handlePathChange(path)}
                  className={cx(
                    styles.pathButton,
                    "rounded-[1.5rem] border p-5 text-left",
                    selected
                      ? "border-[#BE7056] bg-[#BE7056] text-white shadow-[0_18px_45px_rgba(190,112,86,0.24)]"
                      : "border-black/8 bg-white/72 text-neutral-950 hover:border-black/16 hover:bg-white",
                  )}
                >
                  <span className="block font-heading text-2xl font-semibold">
                    {pathCopy[path].title}
                  </span>
                  <span
                    className={cx(
                      "mt-3 block text-base leading-6",
                      selected ? "text-white/90" : "text-neutral-700",
                    )}
                  >
                    {pathCopy[path].subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 rounded-[1.7rem] border border-black/8 bg-white/78 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
              {pathCopy[learningPath].pickerLabel}
            </p>
            <div className={cx(styles.symbolGrid, "mt-4")}>
              {selectionSymbols.map((item) => {
                const selected = item.symbol === selectedBaseSymbol;
                return (
                  <button
                    key={item.symbol}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleSymbolSelect(item.symbol)}
                    className={cx(
                      styles.symbolButton,
                      "rounded-2xl border text-center font-korean text-4xl font-black",
                      selected
                        ? "border-[#BE7056] bg-[#BE7056] text-white shadow-[0_14px_34px_rgba(190,112,86,0.24)]"
                        : "border-transparent bg-[#F3F6F9] text-neutral-900 hover:border-black/10 hover:bg-white",
                    )}
                  >
                    <span aria-hidden="true">{item.symbol}</span>
                    <span className="sr-only">
                      {item.symbol} {item.romanization}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-2xl border border-[#F2D4C9] bg-[#FFF7F3] px-4 py-3 text-sm leading-6 text-[#8C3D2F]">
              Audio data is using the built-in fallback until storage is available.
            </p>
          )}
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                Sound set
              </p>
              <h3 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-neutral-950">
                {learningPath === "consonant" ? (
                  <>
                    <span className="font-korean">{promptSymbol}</span> + all vowels
                  </>
                ) : (
                  <>
                    all consonants + <span className="font-korean">{promptSymbol}</span>
                  </>
                )}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAutoplay}
              className={cx(
                styles.controlButton,
                "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#BE7056] px-5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(190,112,86,0.25)] hover:-translate-y-0.5",
              )}
            >
              <Play className="h-4 w-4 fill-current" />
              {isAutoplaying ? "Stop" : "Autoplay"}
            </button>
          </div>

          <div className={cx(styles.syllableGrid, "mt-6")}>
            {visibleItems.map((item) => {
              const active = activePlaybackId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTilePlay(item)}
                  className={cx(
                    styles.tileButton,
                    active && styles.activePulse,
                    "rounded-[1.35rem] border p-4 text-center",
                    active
                      ? "border-[#BE7056] bg-white text-[#9D513C]"
                      : "border-transparent bg-[#F3F6F9] text-neutral-950 hover:border-black/10 hover:bg-white",
                  )}
                  aria-label={`Play ${item.syllable}`}
                >
                  <span className="block font-korean text-5xl font-black leading-none sm:text-6xl">
                    {item.syllable}
                  </span>
                  <span className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    <Volume2 className="h-3.5 w-3.5" />
                    {consonantRomanizationBySymbol.get(item.consonant)} +{" "}
                    {vowelRomanizationBySymbol.get(item.vowel)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleNext}
              className={cx(
                styles.controlButton,
                "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-neutral-900 hover:-translate-y-0.5 hover:border-black/16",
              )}
            >
              <SkipForward className="h-4 w-4" />
              {learningPath === "consonant" ? "Next consonant" : "Next vowel"}
            </button>
            <button
              type="button"
              onClick={handleSwitchPath}
              className={cx(
                styles.controlButton,
                "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-neutral-900 hover:-translate-y-0.5 hover:border-black/16",
              )}
            >
              <ArrowRightLeft className="h-4 w-4" />
              {learningPath === "consonant"
                ? "Switch to vowels"
                : "Switch to consonants"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

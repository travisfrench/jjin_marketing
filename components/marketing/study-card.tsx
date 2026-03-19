"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type StudyCardProps = {
  label?: string;
  phrase: string;
  romanization: string;
  meaning: string;
  pills?: string[];
  variant?: "hero" | "scene";
  className?: string;
  audioSrc?: string;
  audioLabel?: string;
  isActive?: boolean;
};

export function StudyCard({
  label,
  phrase,
  romanization,
  meaning,
  pills,
  variant = "scene",
  className,
  audioSrc,
  audioLabel,
  isActive = true,
}: StudyCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnd = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isActive) return;
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isActive]);

  const handleAudioToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }
    audio.pause();
  };

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[1.4rem] border border-white/5 bg-[linear-gradient(160deg,rgba(68,71,110,0.9),rgba(146,95,89,0.88))] p-5 shadow-panel-soft backdrop-blur-xl",
        variant === "hero" ? "w-full max-w-md" : "w-full max-w-[28rem] p-6 sm:p-7",
        className,
      )}
    >
      <div className="absolute inset-0 bg-noise-layer opacity-60" aria-hidden />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between gap-3">
          {label ? (
            <p className="inline-flex rounded-full border border-warm/50 bg-warm/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-warm">
              {label}
            </p>
          ) : (
            <span />
          )}

          {audioSrc ? (
            <>
              <audio ref={audioRef} src={audioSrc} preload="metadata" />
              <button
                type="button"
                onClick={handleAudioToggle}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/20"
                aria-label={audioLabel ?? `Play audio for ${meaning}`}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
            </>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <p
            className={cn(
              "text-sm text-muted sm:text-base",
              variant === "scene" ? "tracking-wide" : "",
            )}
          >
            {romanization}
          </p>
          <p
            className={cn(
              "font-korean font-semibold leading-tight text-foreground",
              variant === "hero" ? "text-2xl sm:text-[1.8rem]" : "text-3xl sm:text-[2.4rem]",
            )}
          >
            {phrase}
          </p>
          <p
            className={cn(
              "font-medium text-white/90",
              variant === "hero" ? "text-base" : "text-lg sm:text-xl",
            )}
          >
            {meaning}
          </p>
        </div>

        {pills?.length ? (
          <ul className="flex flex-wrap gap-2">
            {pills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80"
              >
                {pill}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

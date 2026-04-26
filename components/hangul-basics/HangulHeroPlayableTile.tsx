"use client";

import { Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

export function HangulHeroPlayableTile() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function play() {
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;
    audio.pause();
    audio.currentTime = 0;
    audio.src = "/api/hangul-basics/audio/c314e-v314f";
    setIsPlaying(true);

    const clear = () => setIsPlaying(false);
    audio.addEventListener("ended", clear, { once: true });
    audio.addEventListener("error", clear, { once: true });

    try {
      await audio.play();
    } catch {
      clear();
    }
  }

  return (
    <button
      type="button"
      onClick={play}
      className="group grid w-full grid-cols-[auto,1fr,auto] items-center gap-4 rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,#FFFFFF,#F7F9FC)] p-5 text-left shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-black/15 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#2253D9]/25"
      aria-label="Play 하, romanized ha"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3F6F9] font-korean text-4xl font-black text-neutral-950 transition group-hover:bg-white">
        하
      </span>
      <span>
        <span className="block text-xs uppercase tracking-[0.18em] text-neutral-500">
          Hangul audio
        </span>
        <span className="mt-2 block font-heading text-2xl font-semibold text-neutral-950">
          ha
        </span>
      </span>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#BE7056] text-white shadow-[0_14px_34px_rgba(190,112,86,0.24)]">
        {isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5 fill-current" />
        )}
      </span>
    </button>
  );
}

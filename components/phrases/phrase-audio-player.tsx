"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import type { PhraseAudioSource } from "@/lib/phrases/types";

type PhraseAudioPlayerProps = {
  sources: PhraseAudioSource[];
  label: string;
};

export function PhraseAudioPlayer({ sources, label }: PhraseAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeSrc, setActiveSrc] = useState(sources[0]?.src ?? "");
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);

  if (!sources.length) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 p-4 text-sm leading-6 text-white/72">
        Audio preview is being prepared for this phrase. You can still study the
        Korean, romanization, meaning, and related phrases here.
      </div>
    );
  }

  async function handlePlay(source: PhraseAudioSource) {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingSrc === source.src) {
      audio.pause();
      setPlayingSrc(null);
      return;
    }

    if (activeSrc !== source.src) {
      setActiveSrc(source.src);
      audio.src = source.src;
      audio.currentTime = 0;
    }

    try {
      await audio.play();
      setPlayingSrc(source.src);
    } catch {
      setPlayingSrc(null);
    }
  }

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur">
      <audio
        ref={audioRef}
        src={activeSrc}
        preload="metadata"
        onEnded={() => setPlayingSrc(null)}
        onPause={() => setPlayingSrc(null)}
      />
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-950">
          <Volume2 className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.2em] text-white/58">
            Listen first
          </p>
          <p className="truncate text-sm font-medium text-white">{label}</p>
        </div>
        {sources.map((source) => {
          const isPlaying = playingSrc === source.src;

          return (
            <button
              key={`${source.variant}-${source.src}`}
              type="button"
              onClick={() => handlePlay(source)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 text-sm font-semibold text-white transition hover:bg-white/22"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {source.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { MouseEvent, useRef, useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";

type QuickPhrasePlayButtonProps = {
  src?: string;
  label: string;
  variant?: "light" | "dark";
  className?: string;
};

export function QuickPhrasePlayButton({
  src,
  label,
  variant = "light",
  className = "",
}: QuickPhrasePlayButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!src) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  const tone =
    variant === "dark"
      ? "border-white/20 bg-white/12 text-white hover:bg-white/22"
      : "border-[#D7E2FF] bg-[#EEF4FF] text-[#2253D9] hover:bg-[#E2ECFF]";
  const disabledTone =
    variant === "dark"
      ? "border-white/10 bg-white/6 text-white/38"
      : "border-neutral-200 bg-neutral-100 text-neutral-400";

  return (
    <>
      {src ? (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
        />
      ) : null}
      <button
        type="button"
        onClick={handleClick}
        disabled={!src}
        title={src ? label : "Audio preview coming soon"}
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
          src ? tone : disabledTone
        } ${className}`}
        aria-label={src ? label : "Audio preview coming soon"}
      >
        <HiSpeakerWave
          className={`h-5 w-5 ${isPlaying ? "scale-110" : ""}`}
          aria-hidden="true"
        />
      </button>
    </>
  );
}

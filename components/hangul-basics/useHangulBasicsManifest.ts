"use client";

import { useEffect, useState } from "react";
import {
  buildFallbackManifest,
  getHangulBasicsFallbackManifestUrl,
  getHangulBasicsManifestUrl,
} from "@/components/hangul-basics/hangul";
import type { HangulBasicsManifest } from "@/components/hangul-basics/types";

type ManifestState = {
  manifest: HangulBasicsManifest;
  isLoading: boolean;
  error: string | null;
};

async function fetchManifest(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Hangul Basics manifest request failed: ${response.status}`);
  }
  return (await response.json()) as HangulBasicsManifest;
}

export function useHangulBasicsManifest(): ManifestState {
  const [state, setState] = useState<ManifestState>({
    manifest: buildFallbackManifest(),
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      const primaryUrl = getHangulBasicsManifestUrl();
      const fallbackUrl = getHangulBasicsFallbackManifestUrl();

      try {
        const manifest = await fetchManifest(primaryUrl, controller.signal);
        setState({
          manifest,
          isLoading: false,
          error: null,
        });
        return;
      } catch (primaryError) {
        if (controller.signal.aborted) return;

        if (primaryUrl !== fallbackUrl) {
          try {
            const manifest = await fetchManifest(fallbackUrl, controller.signal);
            setState({
              manifest,
              isLoading: false,
              error: null,
            });
            return;
          } catch {
            if (controller.signal.aborted) return;
          }
        }

        setState((current) => ({
          ...current,
          isLoading: false,
          error:
            primaryError instanceof Error
              ? primaryError.message
              : "Unable to load Hangul Basics audio data.",
        }));
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return state;
}

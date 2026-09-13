"use client";

import { useEffect, useRef } from "react";

export function ConceptVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Some browsers remember a per-origin muted preference from earlier
    // autoplay-muted videos on the same site (e.g. the homepage hero) —
    // force it back off so this one plays with sound by default.
    video.muted = false;
    video.volume = 1;
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={videoRef}
      className="w-full aspect-video"
      src={src}
      controls
      playsInline
      preload="metadata"
    />
  );
}

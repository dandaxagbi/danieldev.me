"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export type CampaignSlide = {
  id: string;
  image: string;
  title: string;
  copy: string;
  size: string;
  angle: string;
};

const AUTOPLAY_MS = 6000;

export function ImageCarousel({ slides }: { slides: CampaignSlide[] }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const go = (delta: number) => {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  };

  // Auto-advance, slow — pauses while the lightbox is open so it doesn't
  // change the image out from under someone looking at it full screen.
  useEffect(() => {
    if (lightboxOpen || slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [lightboxOpen, slides.length]);

  const active = slides[index];

  return (
    <div className="flex flex-col gap-4">
      <div className="liquid-glass rounded-2xl overflow-hidden relative">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block w-full group relative"
          aria-label={`Open ${active.title} full screen`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.image}
            alt={active.title}
            className="w-full max-h-[70vh] object-contain bg-black"
          />
          <span className="absolute top-3 right-3 bg-black/60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={16} className="text-white" />
          </span>
        </button>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </>
        )}

        <div className="p-5 border-t border-white/10">
          <p className="text-white text-sm font-medium">{active.title}</p>
          <p className="text-white/50 text-xs mt-1 leading-relaxed">
            {active.copy}
          </p>
          <p className="text-white/35 text-xs mt-3">
            {active.size} — {active.angle}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to ${slide.title}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close full screen"
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous image"
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              >
                <ChevronLeft size={22} className="text-white" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next image"
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              >
                <ChevronRight size={22} className="text-white" />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.image}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

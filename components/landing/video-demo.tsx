"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";

export function VideoDemo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <span className="font-mono-accent text-[11.5px] font-semibold tracking-wider text-brand-blue">
          SEE IT IN ACTION
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
          A two-minute look at your future dashboard
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-brand-ink/60">
          Watch how a lead moves from first inquiry to a closed deal inside
          RealBiz &mdash; no sign-up required.
        </p>

        <div className="relative mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-2xl border border-brand-ink/10 bg-brand-ink shadow-2xl shadow-brand-ink/15">
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play demo video"
              className="group absolute inset-0 flex h-full w-full items-center justify-center"
            >
              {/* Optional Poster/Thumbnail Background */}
              {/* <img src="/demo-poster.jpg" alt="Demo thumbnail" className="absolute inset-0 h-full w-full object-cover" /> */}

              <div className="absolute inset-0 bg-linear-to-t from-brand-ink/70 via-brand-ink/20 to-brand-ink/40" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-blue shadow-lg transition-transform group-hover:scale-105">
                <PlayCircle size={30} strokeWidth={1.6} />
              </span>
              <span className="absolute bottom-5 left-5 rounded-md bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                2:04
              </span>
            </button>
          ) : (
            <video
              className="h-full w-full object-cover"
              controls
              autoPlay
              playsInline
              src="/demo-video.mp4"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
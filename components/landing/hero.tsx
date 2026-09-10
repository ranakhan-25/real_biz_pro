import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  PlayCircle,
  Star,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const AVATAR_COLORS = [
  "bg-brand-blue-soft text-brand-blue",
  "bg-brand-teal-soft text-brand-teal",
  "bg-brand-amber-soft text-brand-amber",
  "bg-brand-violet-soft text-brand-violet",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-14 pb-20 md:px-8 md:pt-20 md:pb-28">
      {/* Updated layout: 60/40 Split using custom CSS grid template */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_40%] lg:gap-16">
        {/* Left: copy (Takes ~60% space) */}
        <div className="flex flex-col items-start">
          <div className="flex w-fit items-center gap-1.5 rounded-full border border-brand-ink/10 bg-white px-3.5 py-1.5 shadow-sm shadow-black/3">
            <TrendingUp size={13} className="text-brand-teal" />
            <span className="font-mono-accent text-[11.5px] font-medium tracking-wide text-brand-ink/70">
              NOW SUPPORTING MULTI-BRANCH TEAMS
            </span>
          </div>

          <h1 className="mt-6 font-display text-[2.35rem] font-semibold leading-[1.12] tracking-tight text-brand-ink md:text-5xl lg:text-[3.25rem]">
            Run your real estate business{" "}
            <span className="text-brand-blue">from one place</span>
          </h1>

          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-brand-ink/60 md:text-[16.5px]">
            Leads, properties, sales pipelines, and your whole team &mdash;
            RealBiz brings every part of your real estate operation into a
            single, easy-to-use platform.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="#pricing"
              className="group flex items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-brand-blue/20 transition-transform hover:-translate-y-0.5"
            >
              Start free trial
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/crm-module"
              className="flex items-center justify-center gap-2 rounded-full border border-brand-ink/10 bg-white px-6 py-3 text-[14px] font-semibold text-brand-ink transition-colors hover:bg-brand-ink/3"
            >
              <PlayCircle size={16} className="text-brand-violet" />
              See live demo
            </Link>
          </div>

          {/* Social proof row */}
          <div className="mt-9 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {["FR", "IC", "NI", "SR"].map((initials, i) => (
                <span
                  key={initials}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-canvas text-[11px] font-semibold ${AVATAR_COLORS[i]}`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-brand-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-0.5 text-[12.5px] text-brand-ink/50">
                Trusted by 200+ real estate teams
              </p>
            </div>
          </div>
        </div>

        {/* Right: image taking ~40% space with decorative styling */}
        {/* Right: image taking ~40% space with screenshot framing */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          {/* Subtle colorful glow backgrounds */}
          <div className="absolute -top-6 -right-6 h-48 w-48 rounded-full bg-brand-violet/15 blur-3xl" />
          <div className="absolute -bottom-6 -left-6 h-48 w-48 rounded-full bg-brand-teal/15 blur-3xl" />

          {/* Main Screenshot Container */}
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-brand-ink/10 bg-slate-900/5 p-2 shadow-2xl shadow-brand-ink/10 backdrop-blur-sm">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-white">
              <Image
                src="/hero-image.png"
                alt="Real estate team reviewing property leads together"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain" // Ensures the ENTIRE laptop screenshot fits without cropping
              />
            </div>
          </div>

          {/* Floating Feature Card 1 */}
          <div className="absolute -bottom-2 -left-4 hidden items-center gap-3 rounded-2xl border border-brand-ink/10 bg-white/90 p-3 shadow-xl backdrop-blur-md sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-brand-ink">
                Lead Management
              </p>
              <p className="text-[11px] text-brand-ink/60">
                Automated routing active
              </p>
            </div>
          </div>

          {/* Floating Feature Card 2 */}
          <div className="absolute -top-4 -right-4 hidden items-center gap-2 rounded-2xl border border-brand-ink/10 bg-white/90 px-3.5 py-2 shadow-xl backdrop-blur-md sm:flex">
            <ShieldCheck size={16} className="text-brand-blue" />
            <span className="text-[12px] font-medium text-brand-ink">
              99.9% Uptime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

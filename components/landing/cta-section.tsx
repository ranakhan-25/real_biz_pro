import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-brand-ink px-8 py-16 text-center md:py-20">
        <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-brand-violet/20 blur-3xl" />

        <div className="relative">
          <h2 className="mx-auto max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Ready to bring your team into one workspace?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] text-white/60">
            Start your free 14-day trial today — no credit card, no setup fees.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/crm-module"
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-brand-ink transition-transform hover:-translate-y-0.5"
            >
              Start free trial
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#pricing"
              className="rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

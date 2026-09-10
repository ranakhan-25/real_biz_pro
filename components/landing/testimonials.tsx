import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "We went from three different spreadsheets to one dashboard. Our agents actually follow up on leads now because they can see exactly what's due.",
    name: "Farhana Rahman",
    role: "Operations Manager",
    company: "Greenview Realty",
    accent: "bg-brand-blue-soft text-brand-blue",
  },
  {
    quote:
      "The sales pipeline view alone paid for itself in the first month — we finally know which deals are stuck and why.",
    name: "Imran Chowdhury",
    role: "Sales Director",
    company: "Northgate Properties",
    accent: "bg-brand-teal-soft text-brand-teal",
  },
  {
    quote:
      "Setup took an afternoon. Our whole team was using it by the end of the week, no training sessions needed.",
    name: "Nadia Islam",
    role: "Founder",
    company: "Cedarwood Group",
    accent: "bg-brand-amber-soft text-brand-amber",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono-accent)] text-[11.5px] font-semibold tracking-wider text-brand-amber">
            TESTIMONIALS
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Teams that switched, and never looked back
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-brand-ink/[0.07] bg-white p-6"
            >
              <div className="flex gap-0.5 text-brand-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-brand-ink/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold ${t.accent}`}
                >
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-brand-ink">{t.name}</p>
                  <p className="text-[12px] text-brand-ink/50">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

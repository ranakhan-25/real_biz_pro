import Link from "next/link";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "For small teams getting organized.",
    features: [
      "Up to 5 users",
      "Lead & contact management",
      "Basic sales pipeline",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
    accent: "border-brand-ink/10",
  },
  {
    name: "Growth",
    price: "$79",
    period: "/month",
    description: "For teams ready to scale operations.",
    features: [
      "Up to 25 users",
      "Full sales pipeline & property matching",
      "Task & visit scheduling",
      "Reports & KPI dashboards",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
    accent: "border-brand-blue",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For multi-branch organizations.",
    features: [
      "Unlimited users & branches",
      "Custom approval layers",
      "Dedicated account manager",
      "SSO & advanced permissions",
      "Onboarding & migration support",
    ],
    cta: "Talk to sales",
    highlighted: false,
    accent: "border-brand-ink/10",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono-accent)] text-[11.5px] font-semibold tracking-wider text-brand-blue">
            PRICING
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Simple pricing, no surprises
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-ink/60">
            Every plan includes a 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border-2 bg-white p-7 ${plan.accent} ${
                plan.highlighted ? "shadow-xl shadow-brand-blue/10 md:-translate-y-2" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-3 py-1 text-[11px] font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-[family-name:var(--font-display)] text-[17px] font-semibold text-brand-ink">
                {plan.name}
              </h3>
              <p className="mt-1 text-[13px] text-brand-ink/50">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-brand-ink">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-[13px] text-brand-ink/45">{plan.period}</span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand-teal" />
                    <span className="text-[13.5px] text-brand-ink/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/crm-module"
                className={`mt-7 rounded-full px-5 py-2.5 text-center text-[13.5px] font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-brand-blue text-white hover:bg-brand-blue/90"
                    : "border border-brand-ink/15 text-brand-ink hover:bg-brand-ink/[0.03]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

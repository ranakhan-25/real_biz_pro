"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Can I import my existing leads and properties?",
    answer:
      "Yes. You can bulk-import leads and property listings from a spreadsheet during setup, or bring them in anytime from your workspace settings.",
  },
  {
    question: "Does RealBiz support multiple branches?",
    answer:
      "Growth and Enterprise plans support multiple branches with their own teams, approval layers, and reporting, all rolled up into one company view.",
  },
  {
    question: "Is there a limit on the number of properties?",
    answer:
      "No. Every plan includes unlimited property listings — pricing scales with the number of users, not your inventory size.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, plans are month-to-month with no long-term contract. You can cancel or change plans anytime from billing settings.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="font-[family-name:var(--font-mono-accent)] text-[11.5px] font-semibold tracking-wider text-brand-violet">
            FAQ
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-brand-ink/[0.08] rounded-2xl border border-brand-ink/[0.08] bg-white">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[14px] font-medium text-brand-ink">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-brand-ink/40 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="animate-[fade-up_0.15s_ease-out] px-6 pb-5">
                    <p className="text-[13.5px] leading-relaxed text-brand-ink/60">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

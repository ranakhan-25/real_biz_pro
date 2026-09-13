"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

const CARDS = [
  {
    titleKey: "partner.landownerTitle",
    descriptionKey: "partner.landownerDescription",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    href: "/login",
  },
  {
    titleKey: "partner.customerTitle",
    descriptionKey: "partner.customerDescription",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    href: "/pricing",
  },
] as const;

export default function PartnerCta() {
  const { t } = useLanguage();

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {t("partner.title")}
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl border border-transparent dark:border-border"
            >
              <Link href={card.href} className="block">
                <div className="relative aspect-[16/10]">
                  <motion.div
                    variants={{ hover: { scale: 1.05 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={card.image} alt="" fill sizes="480px" className="object-cover" />
                  </motion.div>
                  <div className="absolute inset-0 bg-ink/50 dark:bg-black/65" />

                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white dark:text-ink">
                      {t(card.titleKey)}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75 dark:text-ink/80">
                      {t(card.descriptionKey)}
                    </p>
                    <motion.span
                      variants={{ hover: { x: 4 } }}
                      className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground"
                    >
                      {t("hero.cta")}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
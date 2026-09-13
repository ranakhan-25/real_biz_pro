"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function LatestModules() {
  const { t, tArray } = useLanguage();
  const modules = tArray("projects.list");

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("projects.eyebrow")}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("latest.title")}
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {modules.map((mod) => (
            <motion.div
              key={mod.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card dark:bg-card/50 dark:hover:border-accent/40 transition-colors"
            >
              <div className="relative aspect-[4/5]">
                {mod.image && (
                  <motion.div
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={mod.image} alt={mod.title} fill sizes="360px" className="object-cover" />
                  </motion.div>
                )}
                {/* Gradient overlay calibrated for both themes */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent dark:from-black/95 dark:via-black/40 dark:to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-white/70 dark:text-muted-foreground">
                    {mod.description}
                  </p>
                  <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-semibold text-white dark:text-foreground">
                    {mod.title}
                  </h3>
                  <motion.span
                    variants={{ hover: { x: 4 } }}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white dark:text-accent"
                  >
                    {t("projects.viewProject")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
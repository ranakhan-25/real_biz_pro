"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function LatestModules() {
  const { t, tArray } = useLanguage();
  const modules = tArray("projects.list");

  return (
    <section className="bg-background px-5 py-14 sm:px-8 sm:py-20">
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
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group relative overflow-hidden rounded-2xl border border-border"
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

                {/* Default bottom shadow gradient */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

                {/* Bottom-to-Top Solid Cover using Accent Theme Color */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 z-20 bg-accent"
                  variants={{
                    rest: { height: "0%" },
                    hover: { height: "100%" },
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Content Container */}
                <div className="absolute inset-x-0 bottom-0 z-30 p-5">
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-white/70 transition-colors duration-300 group-hover:text-accent-foreground/75">
                    {mod.description}
                  </p>
                  <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-semibold text-white transition-colors duration-300 group-hover:text-accent-foreground">
                    {mod.title}
                  </h3>
                  <motion.span
                    variants={{ hover: { x: 4 } }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-colors duration-300 group-hover:text-accent-foreground"
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
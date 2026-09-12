"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function Testimonials() {
  const { t, tArray } = useLanguage();
  const items = tArray("testimonials.list");

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="chip-kinetic">{t("testimonials.subtitle")}</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("testimonials.title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("testimonials.description")}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -4 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <Quote className="h-5 w-5 text-accent" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                &ldquo;{item.description}&rdquo;
              </p>
              <p className="mt-5 border-t border-border pt-4 text-xs font-medium text-muted-foreground">
                {item.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
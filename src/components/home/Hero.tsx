"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-2 lg:items-center lg:pt-20">
        {/* Left: storyline copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chip-kinetic">{t("legacy.eyebrow")}</span>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {t("legacy.title")}
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("legacy.paragraph1")}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("legacy.paragraph2")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              {t("legacy.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {t("hero.cta")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: layered visual with reduced image height */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Main Hero Image: Reduced height container */}
          <div className="relative aspect-[16/11] max-h-[380px] w-full overflow-hidden rounded-2xl bg-secondary shadow-2xl sm:max-h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              alt={t("hero.dashboardAlt")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Floating Accent Image */}
          <motion.div
            initial={{ opacity: 0, y: 16, x: -16 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -left-6 hidden aspect-square w-32 overflow-hidden rounded-xl border-4 border-background shadow-xl sm:block lg:w-36"
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
              alt="Real estate property preview"
              fill
              sizes="144px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
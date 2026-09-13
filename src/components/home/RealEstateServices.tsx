"use client";

import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
=======
>>>>>>> niloy
import { useLanguage } from "@/lib/language";

export function RealEstateServices() {
  const { t } = useLanguage();

<<<<<<< HEAD
  const features = [t("services.feature1"), t("services.feature2"), t("services.feature3")];

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chip-kinetic">{t("services.subtitle")}</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("services.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("services.description")}
          </p>

          <ul className="mt-6 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-foreground/80">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/properties"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {t("services.explore")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Main Image: Modern Luxury Real Estate Architecture */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
              alt={t("services.imageAlt1")}
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </div>

          {/* Floating Accent Image: High-End Interior / Villa */}
          <div className="absolute -bottom-8 -left-8 hidden aspect-square w-36 overflow-hidden rounded-xl border-4 border-background shadow-xl sm:block">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
              alt={t("services.imageAlt2")}
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
        </motion.div>
=======
  return (
    <section className="w-full bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-medium tracking-wide text-primary">
              {t("services.subtitle")}
            </p>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              {t("services.title")}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
              {t("services.description")}
            </p>

            <div className="mt-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-[10px] text-primary">
                  ✓
                </span>

                <span className="text-sm text-muted-foreground">
                  {t("services.feature1")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-[10px] text-primary">
                  ✓
                </span>

                <span className="text-sm text-muted-foreground">
                  {t("services.feature2")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-[10px] text-primary">
                  ✓
                </span>

                <span className="text-sm text-muted-foreground">
                  {t("services.feature3")}
                </span>
              </div>
            </div>

            <Link
              href="/services"
              className="
                mt-8 inline-flex items-center justify-center
                rounded-full bg-primary px-6 py-2.5
                text-xs font-medium text-primary-foreground
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5 hover:opacity-90
                focus:outline-none focus:ring-2
                focus:ring-primary/40 focus:ring-offset-2
                focus:ring-offset-background
              "
            >
              {t("services.explore")}
            </Link>
          </div>

          <div className="relative mx-auto h-[340px] w-full max-w-[560px] sm:h-[400px]">
            <div
              className="
                absolute right-0 top-0
                h-[220px] w-[78%]
                overflow-hidden rounded-xl
                border border-border
                bg-muted
                shadow-lg
                sm:h-[275px]
              "
            >
              <Image
                src="/image/images1.jpg"
                alt={t("services.imageAlt1")}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 78vw, 440px"
              />
            </div>

            <div
              className="
                absolute bottom-0 left-0
                z-10
                h-[170px] w-[58%]
                overflow-hidden rounded-xl
                border-4 border-background
                bg-muted
                shadow-xl
                sm:h-[210px]
              "
            >
              <Image
                src="/image/images2.jpg"
                alt={t("services.imageAlt2")}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 58vw, 330px"
              />
            </div>

            <div
              className="
                absolute bottom-4 right-[8%]
                -z-0 h-24 w-24
                rounded-full
                bg-primary/10
                blur-2xl
              "
            />
          </div>
        </div>
>>>>>>> niloy
      </div>
    </section>
  );
}
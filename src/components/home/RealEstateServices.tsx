"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language";

export function RealEstateServices() {
  const { t } = useLanguage();

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
      </div>
    </section>
  );
}
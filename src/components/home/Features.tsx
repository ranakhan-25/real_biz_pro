"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

export default function FeaturesPage() {
  const { t, tArray } = useLanguage();

  return (
    <section className="bg-background pt-16 text-foreground sm:pt-20 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("features.subtitle")}
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("features.title")}
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            {t("features.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tArray("features.list").map((feature, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={feature.image || "/image/images4.png"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold">{feature.title}</h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  {t("features.view")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
          >
            {t("features.viewAll")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
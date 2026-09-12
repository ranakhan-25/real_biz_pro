"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="lg:pr-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {language === "en" ? "New Release v2.0" : "নতুন রিলিজ v2.0"}
            </div>
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
              {t("hero.title")}
            </h1>
            <p className="mb-8 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/login">
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-muted/50 border border-border">
              <Image
                src="/assets/dashboard1.webp"
                alt={t("hero.dashboardAlt")}
                fill
                className="object-cover transition-opacity duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 flex items-center gap-3 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl animate-slide-up">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Analytics Dashboard
                </p>
                <p className="text-xs text-muted-foreground">
                  Real-time insights & reports
                </p>
              </div>
            </div>
            <div
              className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 flex items-center gap-3 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Quick Actions
                </p>
                <p className="text-xs text-muted-foreground">
                  One-click workflows
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}

export default Hero;

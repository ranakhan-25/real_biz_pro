"use client";

<<<<<<< HEAD
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
=======
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
>>>>>>> niloy

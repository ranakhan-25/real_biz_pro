"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  LandPlot,
  ClipboardList,
  UserRound,
  Wallet,
  Boxes,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/language";
import { SiteShell } from "@/components/site/SiteNav";

interface ServiceDetail {
  key: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  badgeBg: string;
  badgeFg: string;
  badgeBorder: string;
}

const SERVICES: ServiceDetail[] = [
  {
    key: "landAcquisition",
    icon: LandPlot,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Topographic land survey and plot development site",
    badgeBg: "bg-orange-50 dark:bg-orange-950/40",
    badgeFg: "text-orange-600 dark:text-orange-400",
    badgeBorder: "border-orange-200 dark:border-orange-800/50",
  },
  {
    key: "projectManagement",
    icon: ClipboardList,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Engineers inspecting commercial construction project",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40",
    badgeFg: "text-blue-600 dark:text-blue-400",
    badgeBorder: "border-blue-200 dark:border-blue-800/50",
  },
  {
    key: "crmSales",
    icon: UserRound,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Real estate client consultation and unit closing",
    badgeBg: "bg-sky-50 dark:bg-sky-950/40",
    badgeFg: "text-sky-600 dark:text-sky-400",
    badgeBorder: "border-sky-200 dark:border-sky-800/50",
  },
  {
    key: "financeAccounts",
    icon: Wallet,
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Financial auditing, ledger planning, and balance calculations",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeFg: "text-amber-600 dark:text-amber-400",
    badgeBorder: "border-amber-200 dark:border-amber-800/50",
  },
  {
    key: "materialsInventory",
    icon: Boxes,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern logistics warehouse storing construction materials",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeFg: "text-emerald-600 dark:text-emerald-400",
    badgeBorder: "border-emerald-200 dark:border-emerald-800/50",
  },
  {
    key: "analyticsReporting",
    icon: BarChart3,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Data analytics dashboard with real-time financial tracking",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeFg: "text-purple-600 dark:text-purple-400",
    badgeBorder: "border-purple-200 dark:border-purple-800/50",
  },
];

function ServicesContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/40 via-background to-background py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="chip-kinetic inline-block"
            >
              {t("services.hero.eyebrow") || "End-to-End Real Estate ERP"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {t("services.hero.title") || "Services & Capabilities"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t("services.hero.subtitle") ||
                "Discover how our specialized software modules streamline land sourcing, site engineering, customer management, and financial control."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-24 px-5 sm:px-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            const title =
              t(`services.${service.key}.title`) ||
              service.key.replace(/([A-Z])/g, " $1").trim();
            const description =
              t(`services.${service.key}.desc`) ||
              "Streamline operations, increase efficiency, and gain full visibility into every phase of your real estate projects with automated workflows and real-time insights.";

            const features = [
              t(`services.${service.key}.feat1`) || "Real-time updates and tracking",
              t(`services.${service.key}.feat2`) || "Automated audit logs and reports",
              t(`services.${service.key}.feat3`) || "Seamless multi-department sync",
              t(`services.${service.key}.feat4`) || "Enterprise-grade role security",
            ];

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Container with Custom Frame Effects for Light/Dark mode */}
                <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border/80 bg-card p-1.5 shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl dark:shadow-2xl dark:shadow-black/50 lg:w-1/2">
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index < 2}
                    />
                    {/* Mode-adaptive image overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 dark:opacity-80" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-xl" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors shadow-sm ${service.badgeBg} ${service.badgeFg} ${service.badgeBorder}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Module 0{index + 1}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {description}
                  </p>

                  <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs font-medium text-foreground/90 sm:text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:gap-3 hover:text-primary/80"
                    >
                      <span>Explore workflow</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <SiteShell>
      <ServicesContent />
    </SiteShell>
  );
}
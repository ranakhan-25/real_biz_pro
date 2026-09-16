"use client";

import { motion } from "motion/react";
import {
  Wallet,
  Truck,
  UserRound,
  BarChart2,
  Users,
  Clock,
  FileSpreadsheet,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/language";

interface FeatureConfig {
  key: string;
  icon: LucideIcon;
  iconBg: string;
  iconFg: string;
  hoverBorder: string;
  hoverRing: string;
}

const FEATURES: FeatureConfig[] = [
  {
    key: "accountsFinance",
    icon: Wallet,
    iconBg: "bg-orange-100 dark:bg-orange-950/60",
    iconFg: "text-orange-600 dark:text-orange-400",
    hoverBorder: "hover:border-orange-400/80 dark:hover:border-orange-500/80",
    hoverRing: "hover:ring-orange-400/20 dark:hover:ring-orange-500/20",
  },
  {
    key: "purchaseVendor",
    icon: Truck,
    iconBg: "bg-emerald-100 dark:bg-emerald-950/60",
    iconFg: "text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-400/80 dark:hover:border-emerald-500/80",
    hoverRing: "hover:ring-emerald-400/20 dark:hover:ring-emerald-500/20",
  },
  {
    key: "salesCrm",
    icon: UserRound,
    iconBg: "bg-sky-100 dark:bg-sky-950/60",
    iconFg: "text-sky-600 dark:text-sky-400",
    hoverBorder: "hover:border-sky-400/80 dark:hover:border-sky-500/80",
    hoverRing: "hover:ring-sky-400/20 dark:hover:ring-sky-500/20",
  },
  {
    key: "projectTracking",
    icon: BarChart2,
    iconBg: "bg-indigo-100 dark:bg-indigo-950/60",
    iconFg: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-400/80 dark:hover:border-indigo-500/80",
    hoverRing: "hover:ring-indigo-400/20 dark:hover:ring-indigo-500/20",
  },
  {
    key: "hrPayroll",
    icon: Users,
    iconBg: "bg-teal-100 dark:bg-teal-950/60",
    iconFg: "text-teal-600 dark:text-teal-400",
    hoverBorder: "hover:border-teal-400/80 dark:hover:border-teal-500/80",
    hoverRing: "hover:ring-teal-400/20 dark:hover:ring-teal-500/20",
  },
  {
    key: "autoReminders",
    icon: Clock,
    iconBg: "bg-amber-100 dark:bg-amber-950/60",
    iconFg: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-400/80 dark:hover:border-amber-500/80",
    hoverRing: "hover:ring-amber-400/20 dark:hover:ring-amber-500/20",
  },
  {
    key: "dashboardReports",
    icon: FileSpreadsheet,
    iconBg: "bg-pink-100 dark:bg-pink-950/60",
    iconFg: "text-pink-600 dark:text-pink-400",
    hoverBorder: "hover:border-pink-400/80 dark:hover:border-pink-500/80",
    hoverRing: "hover:ring-pink-400/20 dark:hover:ring-pink-500/20",
  },
  {
    key: "anytimeAccess",
    icon: Globe,
    iconBg: "bg-green-100 dark:bg-green-950/60",
    iconFg: "text-green-600 dark:text-green-400",
    hoverBorder: "hover:border-green-400/80 dark:hover:border-green-500/80",
    hoverRing: "hover:ring-green-400/20 dark:hover:ring-green-500/20",
  },
];

export default function WhyRealBiz() {
  const { t } = useLanguage();

  return (
    <section className="bg-secondary px-5 py-14 sm:px-8 sm:py-20 transition-colors">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="chip-kinetic"
          >
            {t("whyRealBiz.eyebrow")}
          </motion.span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("whyRealBiz.title")}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground"
          >
            {t("whyRealBiz.subtitle")}
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            const title = t(`whyRealBiz.${item.key}.title`);
            const desc = t(`whyRealBiz.${item.key}.desc`);

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:ring-2 hover:shadow-md hover:-translate-y-1.5 ${item.hoverBorder} ${item.hoverRing}`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${item.iconBg} ${item.iconFg}`}
                >
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-5 font-display text-[15px] font-semibold text-card-foreground">
                  {title}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
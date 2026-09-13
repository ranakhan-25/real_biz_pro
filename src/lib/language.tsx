"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "bn";

interface FeatureItem {
  title: string;
  description: string;
  image?: string;
}

type TranslationValue = string | FeatureItem[];
type Translations = Record<string, Record<string, TranslationValue>>;

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Log in",
    "language.english": "English",
    "language.bangla": "বাংলা",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "hero.title": "Build Better Real Estate Business",
    "hero.description":
      "Streamline property management, automate workflows, and grow your portfolio with RealBiz's intelligent platform.",
    "hero.cta": "Get Started Free",
    "hero.dashboardAlt": "RealBiz Dashboard Preview",
    "footer.copyright":
      "© {year} RealBiz. Built for operators, not just owners.",
    "footer.tagline": "RealBiz",
    "features.title": "Everything You Need in One Platform",
    "features.subtitle": "Our Features",
    "features.description":
      "Powerful tools designed to help you manage every part of your business from one simple platform.",
    "features.viewAll": "View All Features",
    "features.view": "View",
    "features.uptime": "99.9% Uptime",
    "features.support": "24/7 Support",
    "features.noCard": "No Credit Card",
    "features.list": [
      {
        title: "Property Management",
        description:
          "Manage properties, units, availability, pricing and property information from one place.",
        image: "/image/images4.jpg",
      },
      {
        title: "Property Listings",
        description:
          "Create and manage property listings with images, details, locations and pricing.",
        image: "/image/images5.jpg",
      },
      {
        title: "Leads & CRM",
        description:
          "Track potential buyers, manage leads and build strong customer relationships.",
        image: "/image/images6.jpg",
      },
      {
        title: "Sales & Booking",
        description:
          "Manage property sales, bookings, customers, payments and booking status easily.",
        image: "/image/images7.jpg",
      },
      {
        title: "Project Management",
        description:
          "Monitor real estate projects, construction progress, tasks and project activities.",
        image: "/image/images8.jpg",
      },
      {
        title: "Accounts & Finance",
        description:
          "Manage payments, expenses, invoices and financial transactions for your business.",
        image: "/image/images9.jpg",
      },
    ],
    "services.title": "Professional real estate services for every need.",
    "services.subtitle": "Real Estate Services",
    "services.description":
      "We provide premium real estate solutions with a wide range of professional services designed to make your property journey simple, secure, and successful.",
    "services.feature1": "Customized Property Marketing",
    "services.feature2": "Property Valuation Services",
    "services.feature3": "Market Research and Analysis",
    "services.explore": "Explore More",
    "services.imageAlt1": "Modern luxury real estate property",
    "services.imageAlt2": "Luxury residential building",

    // Detailed Pricing Translations
    "pricing.badge": "Pricing Plans",
    "pricing.subtitle": "Pricing",
    "pricing.title": "Simple pricing that scales with you",
    "pricing.description":
      "Start free, upgrade when your team grows. No hidden fees, no long-term contracts.",
    "pricing.monthly": "Monthly",
    "pricing.yearly": "Yearly",
    "pricing.saveBadge": "Save 20%",
    "pricing.popular": "Most Popular",
    "pricing.perMonth": "/month",
    "pricing.perYear": "/year",
    "pricing.billedMonthly": "Billed monthly",
    "pricing.custom": "Custom",
    "pricing.cta": "View full pricing",
    "pricing.faqTitle": "Frequently Asked Questions",

    "pricing.starter.name": "Starter",
    "pricing.starter.description": "Essential tools for small teams or solo agents.",
    "pricing.starter.cta": "Get Started",
    "pricing.starter.f1": "Up to 50 active listings",
    "pricing.starter.f2": "Basic Lead CRM",
    "pricing.starter.f3": "2 team member seats",
    "pricing.starter.f4": "Email support",

    "pricing.growth.name": "Growth",
    "pricing.growth.description": "Ideal for expanding teams needing workflow automation.",
    "pricing.growth.cta": "Start 14-Day Free Trial",
    "pricing.growth.note": "$65/mo billed yearly",
    "pricing.growth.f1": "Unlimited listings",
    "pricing.growth.f2": "Advanced Lead CRM & Sales Pipeline",
    "pricing.growth.f3": "10 team member seats",
    "pricing.growth.f4": "Multi-branch management",
    "pricing.growth.f5": "Priority 24/7 support",

    "pricing.enterprise.name": "Enterprise",
    "pricing.enterprise.description": "Tailored features & support for large agencies.",
    "pricing.enterprise.cta": "Contact Sales",
    "pricing.enterprise.note": "Tailored for your business size",
    "pricing.enterprise.f1": "Everything in Growth",
    "pricing.enterprise.f2": "Unlimited team seats",
    "pricing.enterprise.f3": "Custom API & CRM integrations",
    "pricing.enterprise.f4": "Dedicated Account Manager",
    "pricing.enterprise.f5": "Custom SLA & Uptime Guarantee",

    "pricing.faq1.q": "Can I switch plans later?",
    "pricing.faq1.a": "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your workspace settings.",
    "pricing.faq2.q": "Is there a free trial available?",
    "pricing.faq2.a": "We offer a 14-day free trial on the Growth plan with no credit card required.",
    "pricing.faq3.q": "What payment methods do you accept?",
    "pricing.faq3.a": "We accept all major credit cards, debit cards, and corporate bank transfers.",

    "stats.subtitle": "By The Numbers",
    "stats.title": "Trusted by growing real estate teams",
    "stats.label1": "Properties Managed",
    "stats.label2": "Active Agents",
    "stats.label3": "Cities Covered",
    "stats.label4": "Uptime",
    "testimonials.subtitle": "Testimonials",
    "testimonials.title": "Loved by real estate teams",
    "testimonials.description":
      "Hear from the operators and agents who run their business on RealBiz every day.",
    "testimonials.list": [
      {
        title: "Farhana Rahman · Operations Manager, Greenview Realty",
        description:
          "We went from three different spreadsheets to one dashboard. Our agents actually follow up on leads now because they can see exactly what's due.",
      },
      {
        title: "Imran Chowdhury · Sales Director, Northgate Properties",
        description:
          "The sales pipeline view alone paid for itself in the first month — we finally know which deals are stuck and why.",
      },
      {
        title: "Nadia Islam · Founder, Cedarwood Group",
        description:
          "Setup took an afternoon. Our whole team was using it by the end of the week, no training sessions needed.",
      },
    ],
    "faq.subtitle": "FAQ",
    "faq.title": "Frequently asked questions",
    "faq.list": [
      {
        title: "Can I import my existing leads and properties?",
        description:
          "Yes. You can bulk-import leads and property listings from a spreadsheet during setup, or bring them in anytime from your workspace settings.",
      },
      {
        title: "Does RealBiz support multiple branches?",
        description:
          "Growth and Enterprise plans support multiple branches with their own teams, approval layers, and reporting, all rolled up into one company view.",
      },
      {
        title: "Is there a limit on the number of properties?",
        description:
          "No. Every plan includes unlimited property listings — pricing scales with the number of users, not your inventory size.",
      },
      {
        title: "Can I cancel anytime?",
        description:
          "Yes, plans are month-to-month with no long-term contract. You can cancel or change plans anytime from billing settings.",
      },
    ],
    "cta.title": "Ready to grow your real estate business?",
    "cta.description":
      "Start your free 14-day trial today — no credit card, no setup fees.",
    "cta.button": "Get Started Free",
    "cta.secondary": "Talk to Sales",
  },
  bn: {
    "nav.home": "হোম",
    "nav.properties": "প্রপার্টি",
    "nav.pricing": "প্রাইসিং",
    "nav.about": "সম্পর্কে",
    "nav.contact": "যোগাযোগ",
    "nav.login": "লগ ইন",
    "language.english": "ইংরেজি",
    "language.bangla": "বাংলা",
    "theme.light": "আলো",
    "theme.dark": "অন্ধকার",
    "hero.title": "উন্নত বাস্তব সম্পত্তি ব্যবসা তৈরি করুন",
    "hero.description":
      "প্রপার্টি ম্যানেজমেন্ট সুবিন্যাস করুন, কর্মপ্রবাহ অটোমেট করুন এবং RealBiz-এর বুদ্ধিমান প্ল্যাটফর্মের সাথে আপনার পোর্টফোলিও বাড়ান।",
    "hero.cta": "বিনামূল্যে শুরু করুন",
    "hero.dashboardAlt": "RealBiz ড্যাশবোর্ড প্রিভিউ",
    "footer.copyright":
      "© {year} RealBiz. অপারেটরদের জন্য তৈরি, শুধু মালিকদের জন্য নয়।",
    "footer.tagline": "RealBiz",
    "features.title": "এক প্ল্যাটফর্মে আপনার যা কিছু দরকার",
    "features.subtitle": "আমাদের বৈশিষ্ট্য",
    "features.description":
      "আপনার ব্যবসার প্রতিটি অংশ একটি সহজ প্ল্যাটফর্ম থেকে পরিচালনা করতে সাহায্য করার জন্য তৈরি শক্তিশালী টুলস।",
    "features.viewAll": "সব বৈশিষ্ট্য দেখুন",
    "features.view": "দেখুন",
    "features.uptime": "৯৯.৯% আপটাইম",
    "features.support": "২৪/৭ সাপোর্ট",
    "features.noCard": "ক্রেডিট কার্ড লাগবে না",
    "features.list": [
      {
        title: "প্রপার্টি ম্যানেজমেন্ট",
        description:
          "এক জায়গা থেকে প্রপার্টি, ইউনিট, প্রাপ্যতা, মূল্য এবং প্রপার্টি তথ্য পরিচালনা করুন।",
        image: "/image/images4.jpg",
      },
      {
        title: "প্রপার্টি লিস্টিং",
        description:
          "ছবি, বিবরণ, লোকেশন এবং মূল্যের সাথে প্রপার্টি লিস্টিং তৈরি এবং পরিচালনা করুন।",
        image: "/image/images5.jpg",
      },
      {
        title: "লিডস এবং সিআরএম",
        description:
          "সম্ভাব্য ক্রেতা ট্র্যাক করুন, লিড ম্যানেজ করুন এবং শক্তিশালী কাস্টমার সম্পর্ক তৈরি করুন।",
        image: "/image/images6.jpg",
      },
      {
        title: "বিক্রয় এবং বুকিং",
        description:
          "প্রপার্টি বিক্রয়, বুকিং, কাস্টমার, পেমেন্ট এবং বুকিং স্ট্যাটাস সহজে পরিচালনা করুন।",
        image: "/image/images7.jpg",
      },
      {
        title: "প্রজেক্ট ম্যানেজমেন্ট",
        description:
          "বাস্তব সম্পত্তি প্রজেক্ট, নির্মাণের অগ্রগতি, টাস্ক এবং প্রজেক্ট কার্যক্রম পর্যবেক্ষণ করুন।",
        image: "/image/images8.jpg",
      },
      {
        title: "অ্যাকাউন্টস এবং ফাইন্যান্স",
        description:
          "আপনার ব্যবসার জন্য পেমেন্ট, খরচ, ইনভয়েস এবং আর্থিক লেনদেন পরিচালনা করুন।",
        image: "/image/images9.jpg",
      },
    ],
    "services.title": "প্রতিটি প্রয়োজনের জন্য পেশাদার বাস্তব সম্পত্তি সেবা।",
    "services.subtitle": "রিয়েল এস্টেট সেবা",
    "services.description":
      "আমরা আপনার সম্পত্তির যাত্রাকে সহজ, নিরাপদ এবং সফল করার জন্য ডিজাইন করা প্রফেশনাল সেবার বিস্তৃত রেঞ্জের সাথে প্রিমিয়াম বাস্তব সম্পত্তি সমাধান প্রদান করি।",
    "services.feature1": "কাস্টমাইজড প্রপার্টি মার্কেটিং",
    "services.feature2": "প্রপার্টি ভ্যালুয়েশন সার্ভিস",
    "services.feature3": "মার্কেট রিসার্চ এবং অ্যানালিসিস",
    "services.explore": "আরও এক্সপ্লোর করুন",
    "services.imageAlt1": "আধুনিক লাক্সারি বাস্তব সম্পত্তি প্রপার্টি",
    "services.imageAlt2": "লাক্সারি আবাসিক ভবন",

    // Detailed Pricing Translations
    "pricing.badge": "প্রাইসিং প্ল্যান",
    "pricing.subtitle": "মূল্য",
    "pricing.title": "সহজ মূল্য, আপনার টিমের সাথে বাড়ে",
    "pricing.description":
      "ফ্রি শুরু করুন, টিম বাড়লে আপগ্রেড করুন। কোনো লুকায়িত ফি বা দীর্ঘমেয়াদী চুক্তি নেই।",
    "pricing.monthly": "মাসিক",
    "pricing.yearly": "বার্ষিক",
    "pricing.saveBadge": "২০% সাশ্রয়",
    "pricing.popular": "সবচেয়ে জনপ্রিয়",
    "pricing.perMonth": "/মাস",
    "pricing.perYear": "/বছর",
    "pricing.billedMonthly": "প্রতি মাসে বিল প্রদান",
    "pricing.custom": "কাস্টম",
    "pricing.cta": "সম্পূর্ণ মূল্য তালিকা দেখুন",
    "pricing.faqTitle": "প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী",

    "pricing.starter.name": "স্টার্টার",
    "pricing.starter.description": "ছোট টিম বা সোলো এজেন্টদের জন্য প্রয়োজনীয় সুবিধা।",
    "pricing.starter.cta": "শুরু করুন",
    "pricing.starter.f1": "৫০টি পর্যন্ত সক্রিয় লিস্টিং",
    "pricing.starter.f2": "বেসিক লিড সিআরএম",
    "pricing.starter.f3": "২ জন টিম মেম্বার এক্সেস",
    "pricing.starter.f4": "ইমেইল সাপোর্ট",

    "pricing.growth.name": "গ্রোথ",
    "pricing.growth.description": "ওয়ার্কফ্লো অটোমেশন প্রয়োজন এমন ক্রমবর্ধমান টিমের জন্য সেরা।",
    "pricing.growth.cta": "১৪-দিনের ফ্রি ট্রায়াল শুরু করুন",
    "pricing.growth.note": "বার্ষিক বিলে $৬৫/মাস",
    "pricing.growth.f1": "আনলিমিটেড লিস্টিং",
    "pricing.growth.f2": "এডভান্সড লিড সিআরএম এবং সেলস পাইপলাইন",
    "pricing.growth.f3": "১০ জন টিম মেম্বার এক্সেস",
    "pricing.growth.f4": "মাল্টি-ব্রাঞ্চ ম্যানেজমেন্ট",
    "pricing.growth.f5": "২৪/৭ অগ্রাধিকার সাপোর্ট",

    "pricing.enterprise.name": "এন্টারপ্রাইজ",
    "pricing.enterprise.description": "বড় এজেন্সির জন্য কাস্টম সুবিধা এবং সাপোর্ট।",
    "pricing.enterprise.cta": "সেলসে কথা বলুন",
    "pricing.enterprise.note": "আপনার ব্যবসার সাইজ অনুযায়ী কাস্টমাইজড",
    "pricing.enterprise.f1": "গ্রোথ প্ল্যানের সমস্ত সুবিধা",
    "pricing.enterprise.f2": "অসীমিত টিম মেম্বার এক্সেস",
    "pricing.enterprise.f3": "কাস্টম API এবং CRM ইন্টিগ্রেশন",
    "pricing.enterprise.f4": "ডেডিকেটেড একাউন্ট ম্যানেজার",
    "pricing.enterprise.f5": "কাস্টম SLA ও আপটাইম গ্যারান্টি",

    "pricing.faq1.q": "আমি কি পরে প্ল্যান পরিবর্তন করতে পারব?",
    "pricing.faq1.a": "হ্যাঁ, আপনি যেকোনো সময় আপনার ওয়ার্কস্পেস সেটিংস থেকে প্ল্যান আপগ্রেড, ডাউনগ্রেড বা বাতিল করতে পারবেন।",
    "pricing.faq2.q": "কোনো ফ্রি ট্রায়াল কি পাওয়া যাবে?",
    "pricing.faq2.a": "আমরা গ্রোথ প্ল্যানে কোনো ক্রেডিট কার্ড ছাড়াই ১৪-দিনের ফ্রি ট্রায়াল দিচ্ছি।",
    "pricing.faq3.q": "আপনারা কি ধরনের পেমেন্ট মেথড গ্রহণ করেন?",
    "pricing.faq3.a": "আমরা সমস্ত প্রধান ক্রেডিট কার্ড, ডেবিট কার্ড এবং কর্পোরেট ব্যাংক ট্রান্সফার গ্রহণ করি।",

    "stats.subtitle": "সংখ্যায় আমরা",
    "stats.title": "বর্ধনশীল রিয়েল এস্টেট টিমের আস্থা",
    "stats.label1": "প্রপার্টি পরিচালিত",
    "stats.label2": "সক্রিয় এজেন্ট",
    "stats.label3": "শহর কভার করা",
    "stats.label4": "আপটাইম",
    "testimonials.subtitle": "প্রশংসাপত্র",
    "testimonials.title": "রিয়েল এস্টেট টিমের পছন্দ",
    "testimonials.description":
      "যারা প্রতিদিন RealBiz-এ তাদের ব্যবসা চালান, তাদের অভিজ্ঞতা শুনুন।",
    "testimonials.list": [
      {
        title: "ফরহানা রহমান · অপারেশন্স ম্যানেজার, Greenview Realty",
        description:
          "আমরা তিনটি আলাদা স্প্রেডশিট থেকে একটি ড্যাশবোর্ডে এসেছি। এখন আমাদের এজেন্টরা দেখতে পারে কি বাকি আছে বলে সত্যিকারই ফলো-আপ করে।",
      },
      {
        title: "ইমরান চৌধুরী · সেলস ডিরেক্টর, Northgate Properties",
        description:
          "শুধু সেলস পাইপলাইন ভিউটিই প্রথম মাসেই নিজেকে প্রমাণ করেছে — এখন আমরা জানি কোন ডিলগুলো আটকে আছে এবং কেন।",
      },
      {
        title: "নাদিয়া ইসলাম · প্রতিষ্ঠাতা, Cedarwood Group",
        description:
          "সেটআপ সময় লেগেছে এক বিকেল। সপ্তাহের শেষের মধ্যেই আমাদের পুরো টিম এটি ব্যবহার করতে শুরু করে, কোনো প্রশিক্ষণ ছাড়াই।",
      },
    ],
    "faq.subtitle": "সাধারণ প্রশ্ন",
    "faq.title": "প্রায়ই জিজ্ঞাসিত প্রশ্ন",
    "faq.list": [
      {
        title: "আমি কি আমার বিদ্যমান লিড এবং প্রপার্টি আমদানি করতে পারব?",
        description:
          "হ্যাঁ, আপনি সেটআপের সময় একটি স্প্রেডশিট থেকে বাল্ক-ইম্পোর্ট করতে পারেন, বা যেকোনো সময় ওয়ার্কস্পেস সেটিংস থেকে যোগ করতে পারেন।",
      },
      {
        title: "RealBiz কি বিভিন্ন শাখা সমর্থন করে?",
        description:
          "Growth এবং Enterprise প্ল্যানে বিভিন্ন শাখার নিজস্ব টিম, অনুমোদন স্তর এবং রিপোর্টিং সমর্থিত, সব একটি কোম্পানি ভিউতে একত্রিত।",
      },
      {
        title: "প্রপার্টির সংখ্যার কোনো সীমা আছে কি?",
        description:
          "না। প্রতিটি প্ল্যানে অসীমিত প্রপার্টি লিস্টিং অন্তর্ভুক্ত — মূল্য নির্ভর করে ব্যবহারকারীর সংখ্যার উপর, আপনার ইনভেন্টরির আকারের উপর নয়।",
      },
      {
        title: "আমি কি যেকোনো সময় বাতিল করতে পারব?",
        description:
          "হ্যাঁ, প্ল্যানগুলি মাসিক ভিত্তিক, কোনো দীর্ঘমেয়াদী চুক্তি নেই। বিলিং সেটিংস থেকে যেকোনো সময় বাতিল বা প্ল্যান পরিবর্তন করতে পারবেন।",
      },
    ],
    "cta.title": "আপনার রিয়েল এস্টেট ব্যবসা বাড়াতে প্রস্তুত?",
    "cta.description": "আজই আপনার ফ্রি ১৪ দিনের ট্রায়াল শুরু করুন — কোনো কার্ড বা সেটআপ ফি ছাড়াই।",
    "cta.button": "ফ্রি শুরু করুন",
    "cta.secondary": "সেলসের সাথে কথা বলুন",
  },
};

const LANGUAGE_KEY = "realbiz-language";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => FeatureItem[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  tArray: () => [],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    if (stored === "bn" || stored === "en") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const t = (key: string): string => {
    const value = translations[language]?.[key] ?? translations.en[key] ?? key;
    return typeof value === "string" ? value : key;
  };

  const tArray = (key: string): FeatureItem[] => {
    const value = translations[language]?.[key] ?? translations.en[key] ?? [];
    return Array.isArray(value) ? value : [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
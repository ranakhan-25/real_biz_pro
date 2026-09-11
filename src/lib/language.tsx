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
  },
  bn: {
    "nav.home": "হোম",
    "nav.properties": "প্রপার্টি",
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
    "hero.cta": "নিজামত শুরু করুন",
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
          "এক জায়গা থেকে প্রপার্টি, ইউনিট, oírলব্ধতা, মূল্য এবং প্রপার্টি তথ্য পরিচালনা করুন।",
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
    "services.title": "প্রতিটি প্রয়োজনের জন্য পেশাদার বাস্তব সম্পত্তি সেবা।",
    "services.subtitle": "রিয়েল এস্টেট সেবা",
    "services.description":
      "আমরা আপনার সম্পত্তির যাত্রাকে সহজ, নিরাপদ এবং সফল করার জন্য ডিজাইন করা প্রফেশনাল সেবার বিস্তৃত রেঞ্জের সাথে প্রিমিয়াম বাস্তব সম্পত্তি সমাধান প্রদান করি।",
    "services.feature1": "কাস্টমাইজড প্রপার্টি মার্কেটিং",
    "services.feature2": "প্রপার্টি ভ্যালুয়েশন সার্ভিস",
    "services.feature3": "মার্কেট রিসার্চ এবং অ্যানালিসিস",
    "services.explore": "আরও এক্সপ্লোর করুন",
    "services.imageAlt1": "আধুনিক লাক্সারি বাস্তব সম্পত্তি প্রপার্টি",
    "services.imageAlt2": "লাক্সারি আবাসিক ভবন",
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    if (stored === "bn" || stored === "en") {
      setLanguageState(stored);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const t = (key: string): string => {
    if (!mounted) return key;
    const value = translations[language][key] || translations.en[key] || key;
    return typeof value === "string" ? value : key;
  };

  const tArray = (key: string): FeatureItem[] => {
    if (!mounted) return [];
    const value = translations[language][key] || translations.en[key] || [];
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

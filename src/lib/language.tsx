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
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Property Listings",
        description:
          "Create and manage property listings with images, details, locations and pricing.",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Leads & CRM",
        description:
          "Track potential buyers, manage leads and build strong customer relationships.",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Sales & Booking",
        description:
          "Manage property sales, bookings, customers, payments and booking status easily.",
        image:
          "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Project Management",
        description:
          "Monitor real estate projects, construction progress, tasks and project activities.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Accounts & Finance",
        description:
          "Manage payments, expenses, invoices and financial transactions for your business.",
        image:
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
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

    // Pricing Section
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
    "pricing.starter.description":
      "Essential tools for small teams or solo agents.",
    "pricing.starter.cta": "Get Started",
    "pricing.starter.f1": "Up to 50 active listings",
    "pricing.starter.f2": "Basic Lead CRM",
    "pricing.starter.f3": "2 team member seats",
    "pricing.starter.f4": "Email support",

    "pricing.growth.name": "Growth",
    "pricing.growth.description":
      "Ideal for expanding teams needing workflow automation.",
    "pricing.growth.cta": "Start 14-Day Free Trial",
    "pricing.growth.note": "$65/mo billed yearly",
    "pricing.growth.f1": "Unlimited listings",
    "pricing.growth.f2": "Advanced Lead CRM & Sales Pipeline",
    "pricing.growth.f3": "10 team member seats",
    "pricing.growth.f4": "Multi-branch management",
    "pricing.growth.f5": "Priority 24/7 support",

    "pricing.enterprise.name": "Enterprise",
    "pricing.enterprise.description":
      "Tailored features & support for large agencies.",
    "pricing.enterprise.cta": "Contact Sales",
    "pricing.enterprise.note": "Tailored for your business size",
    "pricing.enterprise.f1": "Everything in Growth",
    "pricing.enterprise.f2": "Unlimited team seats",
    "pricing.enterprise.f3": "Custom API & CRM integrations",
    "pricing.enterprise.f4": "Dedicated Account Manager",
    "pricing.enterprise.f5": "Custom SLA & Uptime Guarantee",

    "pricing.faq1.q": "Can I switch plans later?",
    "pricing.faq1.a":
      "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your workspace settings.",
    "pricing.faq2.q": "Is there a free trial available?",
    "pricing.faq2.a":
      "We offer a 14-day free trial on the Growth plan with no credit card required.",
    "pricing.faq3.q": "What payment methods do you accept?",
    "pricing.faq3.a":
      "We accept all major credit cards, debit cards, and corporate bank transfers.",

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

    "legacy.eyebrow": "THE REALBIZ STORY",
    "legacy.title": "Built by Operators, for Operators",
    "legacy.titleLine1": "The Blueprint of",
    "legacy.titleAccent": "Growth",
    "legacy.paragraph1":
      "RealBiz started with a simple observation: real estate teams were running multi-crore operations out of spreadsheets and group chats. Leads got lost, follow-ups were missed, and owners had no single view of the business.",
    "legacy.paragraph2":
      "So we built the platform we wished existed — CRM, property sales, billing, and reporting in one place, designed around how real estate businesses in Bangladesh actually work day to day.",
    "legacy.cta": "Learn More",

    "projects.eyebrow": "WHAT'S INSIDE",
    "projects.viewProject": "Explore Module",
    "projects.list": [
      {
        title: "CRM & Lead Management",
        description: "Core Module · Leads & Follow-ups · Live",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Property & Flat Sales",
        description: "Core Module · Booking & Inventory · Live",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Billing & Reports",
        description: "Core Module · Invoicing & KPIs · Live",
        image:
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      },
    ],

    "milestones.founded": "9",
    "milestones.tagline": "One platform for the whole real estate business",
    "milestones.stat1": "Properties Managed",
    "milestones.stat2": "Leads Processed Monthly",
    "milestones.stat3": "Active Agencies",
    "milestones.stat4": "Cities Covered",
    "milestones.stat5": "Modules in One Platform",
    "milestones.stat6": "Platform Uptime %",

    "partner.title": "Join Us as a Partner",
    "partner.landownerTitle": "For Agencies",
    "partner.landownerDescription":
      "Bring your whole team onto one platform and turn your listings into a streamlined sales operation.",
    "partner.customerTitle": "For Individual Agents",
    "partner.customerDescription":
      "Manage your own leads, visits, and deals without needing a full team rollout.",
    "latest.title": "The platform, module by module",
    "landowner.eyebrow": "FOR LAND OWNERS",
    "landowner.titleLine1": "Turn Your Land Into a",
    "landowner.titleAccent": "Legacy",
    "landowner.description":
      "List your plot, track every offer, and manage the full acquisition process \u2014 negotiation, legal verification, and documentation \u2014 without losing sight of a single detail.",
    "landowner.point1":
      "Get matched with verified agencies actively looking for land",
    "landowner.point2": "Track negotiation status and offers in real time",
    "landowner.point3": "Legal document verification built into every step",
    "landowner.point4": "Follow-up scheduling so no conversation goes cold",
    "landowner.cta": "List Your Land",
    "agency.eyebrow": "FOR AGENCIES",
    "agency.titleLine1": "Run Your Whole",
    "agency.titleAccent": "Business",
    "agency.description":
      "From the first lead to the final handover, give your entire team one shared system for sales, billing, and reporting \u2014 no more juggling five different tools.",
    "agency.point1": "Assign and track leads across every agent automatically",
    "agency.point2": "Manage flats, land, and bookings in one inventory",
    "agency.point3":
      "Generate invoices and track payments without spreadsheets",
    "agency.point4": "See team performance and pipeline health at a glance",
    "agency.cta": "Start Free Trial",
    "process.eyebrow": "HOW IT WORKS",
    "process.title": "From sign-up to your first closed deal",
    "process.step1.title": "Set up your workspace",
    "process.step1.description":
      "Add your company, branches, and team in minutes with a guided setup.",
    "process.step2.title": "Import or add your data",
    "process.step2.description":
      "Bring in existing leads and property listings, or start fresh with our templates.",
    "process.step3.title": "Assign and automate",
    "process.step3.description":
      "Route new leads automatically and let approval layers handle the rest.",
    "process.step4.title": "Track, close, and grow",
    "process.step4.description":
      "Follow every deal to close with reports that show exactly where to focus.",

    "properties.eyebrow": "OUR PORTFOLIO",
    "properties.title": "Browse properties across every stage",
    "properties.description":
      "From plots still under negotiation to flats ready to move in, track every property type your business handles in one catalog.",
    "properties.construction.title": "Under Construction",
    "properties.construction.description":
      "Projects currently being built, tracked from foundation to handover.",
    "properties.readyBuilding.title": "Ready Buildings",
    "properties.readyBuilding.description":
      "Completed buildings with units ready for occupancy.",
    "properties.readyLand.title": "Ready Land",
    "properties.readyLand.description":
      "Verified plots with clear title, ready to transfer.",
    "properties.readyFlat.title": "Ready Flats",
    "properties.readyFlat.description":
      "Finished flats with floor plans and pricing ready to book.",
    "properties.cta": "Enquire Now",

    "about.eyebrow": "ABOUT REALBIZ",
    "about.title": "A platform built from the ground up for real estate",
    "about.paragraph1":
      "We spent months talking to agents, sales managers, and business owners before writing a single line of code. What we heard again and again: the tools that existed were either too generic to fit real estate, or too complex to actually get a team to use.",
    "about.paragraph2":
      "RealBiz is our answer \u2014 a platform shaped entirely around how real estate businesses in Bangladesh operate day to day, from the first lead call to the final handover.",
    "about.missionTitle": "Our Mission",
    "about.missionText":
      "To give every real estate business, from a five-person agency to a multi-branch developer, the same level of operational clarity that only the biggest players used to have.",
    "about.valuesTitle": "What We Believe",
    "about.value1.title": "Built for operators",
    "about.value1.description":
      "Every feature is designed around the person who has to use it daily, not just the person buying the software.",
    "about.value2.title": "No hidden complexity",
    "about.value2.description":
      "Powerful doesn't have to mean complicated. Teams should be productive within a day of signing up.",
    "about.value3.title": "Data stays yours",
    "about.value3.description":
      "Export anything, anytime. We earn your business every renewal, not through lock-in.",

    "contact.eyebrow": "GET IN TOUCH",
    "contact.title": "Let's talk about your business",
    "contact.description":
      "Have a question about plans, a feature request, or want a live walkthrough? Send us a message and we'll get back to you within one business day.",
    "contact.addressLabel": "Office",
    "contact.address": "Level 6, Gulshan Avenue, Dhaka 1212, Bangladesh",
    "contact.emailLabel": "Email",
    "contact.email": "hello@realbiz.example",
    "contact.phoneLabel": "Phone",
    "contact.phone": "+880 1XXX-XXXXXX",
    "contact.form.name": "Full name",
    "contact.form.email": "Email address",
    "contact.form.company": "Company name",
    "contact.form.message": "How can we help?",
    "contact.form.submit": "Send Message",
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
          "এক জায়গা থেকে প্রপার্টি, ইউনিট, উপলব্ধতা, মূল্য এবং প্রপার্টি তথ্য পরিচালনা করুন।",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "প্রপার্টি লিস্টিং",
        description:
          "ছবি, বিবরণ, লোকেশন এবং মূল্যের সাথে প্রপার্টি লিস্টিং তৈরি এবং পরিচালনা করুন।",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "লিডস এবং সিআরএম",
        description:
          "সম্ভাব্য ক্রেতা ট্র্যাক করুন, লিড ম্যানেজ করুন এবং শক্তিশালী কাস্টমার সম্পর্ক তৈরি করুন।",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "বিক্রয় এবং বুকিং",
        description:
          "প্রপার্টি বিক্রয়, বুকিং, কাস্টমার, পেমেন্ট এবং বুকিং স্ট্যাটাস সহজে পরিচালনা করুন।",
        image:
          "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "প্রজেক্ট ম্যানেজমেন্ট",
        description:
          "বাস্তব সম্পত্তি প্রজেক্ট, নির্মাণের অগ্রগতি, টাস্ক এবং প্রজেক্ট কার্যক্রম পর্যবেক্ষণ করুন।",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "অ্যাকাউন্টস এবং ফাইন্যান্স",
        description:
          "আপনার ব্যবসার জন্য পেমেন্ট, খরচ, ইনভয়েস এবং আর্থিক লেনদেন পরিচালনা করুন।",
        image:
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
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

    // Pricing Section (Bangla)
    "pricing.badge": "প্রাইসিং প্ল্যান",
    "pricing.subtitle": "মূল্য",
    "pricing.title": "সহজ মূল্য, আপনার টিমের সাথে বাড়ে",
    "pricing.description":
      "ফ্রি শুরু করুন, টিম বাড়লে আপগ্রেড করুন। কোনো লুকিয়িত ফি বা দীর্ঘমেয়াদী চুক্তি নেই।",
    "pricing.monthly": "মাসিক",
    "pricing.yearly": "বার্ষিক",
    "pricing.saveBadge": "~২০% সাশ্রয়",
    "pricing.popular": "সবচেয়ে জনপ্রিয়",
    "pricing.perMonth": "/মাস",
    "pricing.perYear": "/বছর",
    "pricing.billedMonthly": "মাসিক বিল দেওয়া হবে",
    "pricing.custom": "কাস্টম",
    "pricing.cta": "সম্পূর্ণ মূল্য তালিকা দেখুন",
    "pricing.faqTitle": "সাধারণ জিজ্ঞাসাসমূহ",

    "pricing.starter.name": "স্টার্টার",
    "pricing.starter.description":
      "ছোট টিম বা একক এজেন্টদের জন্য প্রয়োজনীয় টুলস।",
    "pricing.starter.cta": "শুরু করুন",
    "pricing.starter.f1": "সর্বোচ্চ ৫০টি সক্রিয় লিস্টিং",
    "pricing.starter.f2": "বেসিক লিড সিআরএম",
    "pricing.starter.f3": "২ জন টিম মেম্বার সিট",
    "pricing.starter.f4": "ইমেল সহায়তা",

    "pricing.growth.name": "গ্রোথ",
    "pricing.growth.description":
      "কার্যক্রম অটোমেট করতে চাওয়া টিমের জন্য আদর্শ।",
    "pricing.growth.cta": "১৪ দিনের ফ্রি ট্রায়াল শুরু করুন",
    "pricing.growth.note": "বার্ষিক বিলে $৬৫/মাস",
    "pricing.growth.f1": "আনলিমিটেড লিস্টিং",
    "pricing.growth.f2": "অ্যাডভান্সড লিড সিআরএম ও সেলস পাইপলাইন",
    "pricing.growth.f3": "১০ জন টিম মেম্বার সিট",
    "pricing.growth.f4": "মাল্টি-ব্রাঞ্চ ম্যানেজমেন্ট",
    "pricing.growth.f5": "অগ্রাধিকার ২৪/৭ সাপোর্ট",

    "pricing.enterprise.name": "এন্টারপ্রাইজ",
    "pricing.enterprise.description":
      "বড় এজেন্সির জন্য কাস্টমাইজড ফিচার ও সাপোর্ট।",
    "pricing.enterprise.cta": "সেলসের সাথে কথা বলুন",
    "pricing.enterprise.note": "আপনার ব্যবসার আকার অনুযায়ী নির্ধারিত",
    "pricing.enterprise.f1": "গ্রোথ প্ল্যানের সব ফিচার",
    "pricing.enterprise.f2": "আনলিমিটেড টিম সিট",
    "pricing.enterprise.f3": "কাস্টম API ও CRM ইন্টিগ্রেশন",
    "pricing.enterprise.f4": "ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার",
    "pricing.enterprise.f5": "কাস্টম SLA ও আপটাইম গ্যারান্টি",

    "pricing.faq1.q": "আমি কি পরে প্ল্যান পরিবর্তন করতে পারব?",
    "pricing.faq1.a":
      "হ্যাঁ, যেকোনো সময় বিলিং সেটিংস থেকে আপগ্রেড বা ডাউনগ্রেড করতে পারেন — এটি পরবর্তী সাইকেল থেকে কার্যকর হবে।",
    "pricing.faq2.q": "ফ্রি ট্রায়াল শেষ হওয়ার পর কী হবে?",
    "pricing.faq2.a":
      "আপনাকে একটি প্ল্যান বেছে নিতে বলা হবে। আপনার অনুমতি ছাড়া কোনো চার্জ নেওয়া হবে না।",
    "pricing.faq3.q": "আপনারা কি পেমেন্ট মেথড গ্রহণ করেন?",
    "pricing.faq3.a":
      "আমরা সমস্ত প্রধান ক্রেডিট কার্ড, ডেবিট কার্ড এবং কর্পোরেট ব্যাংক ট্রান্সফার গ্রহণ করি।",

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
    "cta.description":
      "আজই আপনার ফ্রি ১৪ দিনের ট্রায়াল শুরু করুন — কোনো কার্ড বা সেটআপ ফি ছাড়াই।",
    "cta.button": "ফ্রি শুরু করুন",
    "cta.secondary": "সেলসের সাথে কথা বলুন",

    "legacy.eyebrow": "রিয়েলবিজের গল্প",
    "legacy.title": "অপারেটরদের দ্বারা, অপারেটরদের জন্য তৈরি",
    "legacy.titleLine1": "প্রবৃদ্ধির",
    "legacy.titleAccent": "নীলনকশা",
    "legacy.paragraph1":
      "RealBiz শুরু হয়েছিল একটি সাধারণ পর্যবেক্ষণ থেকে: রিয়েল এস্টেট টিমগুলো কোটি টাকার কার্যক্রম চালাচ্ছিল স্প্রেডশিট আর গ্রুপ চ্যাটের উপর ভিত্তি করে। লিড হারিয়ে যেত, ফলো-আপ মিস হতো, আর মালিকদের ব্যবসার কোনো একক দৃষ্টিভঙ্গি ছিল না।",
    "legacy.paragraph2":
      "তাই আমরা এমন একটি প্ল্যাটফর্ম তৈরি করেছি যা আমরা নিজেরাই চেয়েছিলাম — CRM, প্রপার্টি বিক্রয়, বিলিং এবং রিপোর্টিং সব একসাথে, বাংলাদেশের রিয়েল এস্টেট ব্যবসাগুলো যেভাবে দৈনন্দিন কাজ করে তার উপর ভিত্তি করে ডিজাইন করা।",
    "legacy.cta": "আরও জানুন",

    "projects.eyebrow": "যা কিছু আছে ভিতরে",
    "projects.viewProject": "মডিউল দেখুন",
    "projects.list": [
      {
        title: "CRM ও লিড ম্যানেজমেন্ট",
        description: "মূল মডিউল · লিড ও ফলো-আপ · লাইভ",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "প্রপার্টি ও ফ্ল্যাট বিক্রয়",
        description: "মূল মডিউল · বুকিং ও ইনভেন্টরি · লাইভ",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "বিলিং ও রিপোর্ট",
        description: "মূল মডিউল · ইনভয়েসিং ও KPI · লাইভ",
        image:
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      },
    ],

    "milestones.founded": "৯",
    "milestones.tagline": "পুরো রিয়েল এস্টেট ব্যবসার জন্য একটি প্ল্যাটফর্ম",
    "milestones.stat1": "প্রপার্টি পরিচালিত",
    "milestones.stat2": "মাসিক লিড প্রসেস করা হয়েছে",
    "milestones.stat3": "সক্রিয় এজেন্সি",
    "milestones.stat4": "শহর কভার করা",
    "milestones.stat5": "একই প্ল্যাটফর্মে মডিউল",
    "milestones.stat6": "প্ল্যাটফর্ম আপটাইম %",

    "partner.title": "পার্টনার হিসেবে যোগ দিন",
    "partner.landownerTitle": "এজেন্সির জন্য",
    "partner.landownerDescription":
      "আপনার পুরো টিমকে একটি প্ল্যাটফর্মে আনুন এবং আপনার লিস্টিংকে একটি সুবিন্যস্ত সেলস অপারেশনে পরিণত করুন।",
    "partner.customerTitle": "একক এজেন্টদের জন্য",
    "partner.customerDescription":
      "পুরো টিম রোলআউট ছাড়াই নিজের লিড, ভিজিট এবং ডিল পরিচালনা করুন।",
    "latest.title": "প্ল্যাটফর্ম, মডিউল অনুযায়ী",
    "landowner.eyebrow": "জমির মালিকদের জন্য",
    "landowner.titleLine1": "আপনার জমিকে একটি",
    "landowner.titleAccent": "উত্তরাধিকার",
    "landowner.description":
      "আপনার প্লট তালিকাভুক্ত করুন, প্রতিটি অফার ট্র্যাক করুন এবং সম্পূর্ণ অধিগ্রহণ প্রক্রিয়া \u2014 নেগোসিয়েশন, আইনি যাচাই এবং ডকুমেন্টেশন \u2014 কোনো বিবরণ না হারিয়ে পরিচালনা করুন।",
    "landowner.point1":
      "যাচাইকৃত এজেন্সির সাথে মিলিত হন যারা সক্রিয়ভাবে জমি খুঁজছে",
    "landowner.point2":
      "রিয়েল-টাইমে নেগোসিয়েশন স্ট্যাটাস এবং অফার ট্র্যাক করুন",
    "landowner.point3": "প্রতিটি ধাপে আইনি নথি যাচাই অন্তর্ভুক্ত",
    "landowner.point4": "ফলো-আপ শিডিউলিং যাতে কোনো কথোপকথন ঠান্ডা না হয়",
    "landowner.cta": "আপনার জমি তালিকাভুক্ত করুন",
    "agency.eyebrow": "এজেন্সিদের জন্য",
    "agency.titleLine1": "আপনার পুরো ব্যবসা",
    "agency.titleAccent": "পরিচালনা করুন",
    "agency.description":
      "প্রথম লিড থেকে চূড়ান্ত হ্যান্ডওভার পর্যন্ত, আপনার পুরো টিমকে সেলস, বিলিং এবং রিপোর্টিংয়ের জন্য একটি ভাগ করা সিস্টেম দিন \u2014 পাঁচটি ভিন্ন টুল আর জাগল করতে হবে না।",
    "agency.point1":
      "প্রতিটি এজেন্ট জুড়ে স্বয়ংক্রিয়ভাবে লিড বরাদ্দ ও ট্র্যাক করুন",
    "agency.point2": "একটি ইনভেন্টরিতে ফ্ল্যাট, জমি এবং বুকিং পরিচালনা করুন",
    "agency.point3": "স্প্রেডশিট ছাড়াই ইনভয়েস তৈরি এবং পেমেন্ট ট্র্যাক করুন",
    "agency.point4": "এক নজরে টিমের কর্মক্ষমতা এবং পাইপলাইনের অবস্থা দেখুন",
    "agency.cta": "ফ্রি ট্রায়াল শুরু করুন",
    "process.eyebrow": "কিভাবে কাজ করে",
    "process.title": "সাইন-আপ থেকে আপনার প্রথম বন্ধ হওয়া ডিল পর্যন্ত",
    "process.step1.title": "আপনার ওয়ার্কস্পেস সেট আপ করুন",
    "process.step1.description":
      "গাইডেড সেটআপের মাধ্যমে মিনিটের মধ্যে আপনার কোম্পানি, শাখা এবং টিম যোগ করুন।",
    "process.step2.title": "আপনার ডেটা আমদানি বা যোগ করুন",
    "process.step2.description":
      "বিদ্যমান লিড এবং প্রপার্টি লিস্টিং নিয়ে আসুন, বা আমাদের টেমপ্লেট দিয়ে নতুন করে শুরু করুন।",
    "process.step3.title": "বরাদ্দ এবং অটোমেট করুন",
    "process.step3.description":
      "নতুন লিড স্বয়ংক্রিয়ভাবে রুট করুন এবং বাকিটা অনুমোদন স্তরকে করতে দিন।",
    "process.step4.title": "ট্র্যাক করুন, বন্ধ করুন এবং বাড়ান",
    "process.step4.description":
      "রিপোর্টের সাহায্যে প্রতিটি ডিল বন্ধ পর্যন্ত অনুসরণ করুন যা দেখায় ঠিক কোথায় মনোযোগ দিতে হবে।",

    "properties.eyebrow": "আমাদের পোর্টফোলিও",
    "properties.title": "প্রতিটি ধাপের প্রপার্টি ব্রাউজ করুন",
    "properties.description":
      "এখনও নেগোসিয়েশনে থাকা প্লট থেকে শুরু করে বসবাসের জন্য প্রস্তুত ফ্ল্যাট পর্যন্ত, আপনার ব্যবসার পরিচালিত প্রতিটি প্রপার্টি ধরন এক ক্যাটালগে ট্র্যাক করুন।",
    "properties.construction.title": "নির্মাণাধীন",
    "properties.construction.description":
      "ফাউন্ডেশন থেকে হ্যান্ডওভার পর্যন্ত ট্র্যাক করা বর্তমানে নির্মাণাধীন প্রকল্প।",
    "properties.readyBuilding.title": "প্রস্তুত ভবন",
    "properties.readyBuilding.description":
      "বসবাসের জন্য প্রস্তুত ইউনিটসহ সম্পূর্ণ ভবন।",
    "properties.readyLand.title": "প্রস্তুত জমি",
    "properties.readyLand.description":
      "সুস্পষ্ট দলিলসহ হস্তান্তরযোগ্য যাচাইকৃত প্লট।",
    "properties.readyFlat.title": "প্রস্তুত ফ্ল্যাট",
    "properties.readyFlat.description":
      "ফ্লোর প্ল্যান ও মূল্যসহ বুকিংয়ের জন্য প্রস্তুত সম্পূর্ণ ফ্ল্যাট।",
    "properties.cta": "এখনই জিজ্ঞাসা করুন",

    "about.eyebrow": "রিয়েলবিজ সম্পর্কে",
    "about.title": "রিয়েল এস্টেটের জন্য শুরু থেকে তৈরি একটি প্ল্যাটফর্ম",
    "about.paragraph1":
      "কোড লেখার আগে আমরা মাসের পর মাস এজেন্ট, সেলস ম্যানেজার এবং ব্যবসার মালিকদের সাথে কথা বলেছি। বারবার যা শুনেছি: বিদ্যমান টুলগুলো হয় রিয়েল এস্টেটের জন্য খুব সাধারণ, নয়তো টিমকে আসলে ব্যবহার করাতে খুব জটিল ছিল।",
    "about.paragraph2":
      "RealBiz হলো আমাদের উত্তর \u2014 বাংলাদেশের রিয়েল এস্টেট ব্যবসাগুলো দৈনন্দিন যেভাবে কাজ করে তার উপর সম্পূর্ণভাবে গড়া একটি প্ল্যাটফর্ম, প্রথম লিড কল থেকে চূড়ান্ত হ্যান্ডওভার পর্যন্ত।",
    "about.missionTitle": "আমাদের লক্ষ্য",
    "about.missionText":
      "প্রতিটি রিয়েল এস্টেট ব্যবসাকে, পাঁচজনের এজেন্সি থেকে শুরু করে মাল্টি-ব্রাঞ্চ ডেভেলপার পর্যন্ত, একই স্তরের কার্যক্রম স্বচ্ছতা দেওয়া যা আগে শুধু সবচেয়ে বড় প্রতিষ্ঠানগুলোর কাছে ছিল।",
    "about.valuesTitle": "আমরা যা বিশ্বাস করি",
    "about.value1.title": "অপারেটরদের জন্য তৈরি",
    "about.value1.description":
      "প্রতিটি ফিচার তৈরি হয়েছে যিনি প্রতিদিন এটি ব্যবহার করেন তার কথা মাথায় রেখে, শুধু যিনি সফটওয়্যারটি কেনেন তার জন্য নয়।",
    "about.value2.title": "লুকানো জটিলতা নেই",
    "about.value2.description":
      "শক্তিশালী হওয়ার মানে জটিল হওয়া নয়। সাইন আপের একদিনের মধ্যেই টিমের উৎপাদনশীল হওয়া উচিত।",
    "about.value3.title": "ডেটা আপনার থাকে",
    "about.value3.description":
      "যেকোনো সময় যেকোনো কিছু এক্সপোর্ট করুন। আমরা প্রতিটি নবায়নে আপনার ব্যবসা অর্জন করি, লক-ইনের মাধ্যমে নয়।",

    "contact.eyebrow": "যোগাযোগ করুন",
    "contact.title": "আপনার ব্যবসা নিয়ে কথা বলি",
    "contact.description":
      "প্ল্যান নিয়ে প্রশ্ন, ফিচার রিকোয়েস্ট, বা লাইভ ওয়াকথ্রু চান? আমাদের একটি বার্তা পাঠান, আমরা এক কার্যদিবসের মধ্যে ফিরে আসব।",
    "contact.addressLabel": "অফিস",
    "contact.address": "লেভেল ৬, গুলশান অ্যাভিনিউ, ঢাকা ১২১২, বাংলাদেশ",
    "contact.emailLabel": "ইমেল",
    "contact.email": "hello@realbiz.example",
    "contact.phoneLabel": "ফোন",
    "contact.phone": "+৮৮০ ১XXX-XXXXXX",
    "contact.form.name": "পূর্ণ নাম",
    "contact.form.email": "ইমেল ঠিকানা",
    "contact.form.company": "কোম্পানির নাম",
    "contact.form.message": "আমরা কীভাবে সাহায্য করতে পারি?",
    "contact.form.submit": "বার্তা পাঠান",
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

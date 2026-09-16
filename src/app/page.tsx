import { SiteShell } from "@/components/site/SiteNav";

import Hero from "@/components/home/Hero";
import Milestones from "@/components/home/milestones";
import SolutionsGrid from "@/components/home/solutions-grid";
import WhyRealBiz from "@/components/home/why-realbiz";
import ModuleGrid from "@/components/home/module-grid";
import LatestModules from "@/components/home/latest-modules";
import LandOwners from "@/components/home/land-owners";
import Agencies from "@/components/home/agencies";
import Process from "@/components/home/process";
import FeaturesPage from "@/components/home/Features";
import TestimonialCarousel from "@/components/home/testimonials";
import PricingSection from "@/components/home/pricing-section";
import Faq from "@/components/home/faq";
import Cta from "@/components/home/cta";
import { RealEstateServices } from "@/components/home/RealEstateServices";

export default function HomePage() {
  return (
    <SiteShell>
      <main className="flex flex-col gap-y-12 sm:gap-y-20">
        <Hero />
        <Milestones />

        <SolutionsGrid />
        <WhyRealBiz />

        <ModuleGrid />
        <LatestModules />

        <LandOwners />
        <Agencies />
        <RealEstateServices />

        <Process />
        <FeaturesPage />

        <TestimonialCarousel />

        <PricingSection />
        <Faq />
        <Cta />
      </main>
    </SiteShell>
  );
}
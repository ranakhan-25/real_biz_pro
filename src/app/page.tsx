import { SiteShell } from "@/components/site/SiteNav";

import Hero from "@/components/home/Hero";
import Milestones from "@/components/home/milestones";
import LatestModules from "@/components/home/latest-modules";
import FeaturesPage from "@/components/home/Features";
import { RealEstateServices } from "@/components/home/RealEstateServices";
import TestimonialCarousel from "@/components/home/testimonials";
import PricingSection from "@/components/home/pricing-section";
import Faq from "@/components/home/faq";
import Cta from "@/components/home/cta";
import LandOwners from "@/components/home/land-owners";
import Agencies from "@/components/home/agencies";
import Process from "@/components/home/process";

export default function HomePage() {
  return (
    <div>
      <SiteShell>
        <Hero />
        <Milestones />
        <LatestModules />
        <LandOwners />
        <Agencies />
        <FeaturesPage />
        <RealEstateServices />
        <Process />
        <TestimonialCarousel />
        <PricingSection />
        <Faq />
        <Cta />
      </SiteShell>
    </div>
  );
}

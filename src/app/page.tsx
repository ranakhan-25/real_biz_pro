import { SiteShell } from "@/components/site/SiteNav";

import Hero from "@/components/home/Hero";
<<<<<<< HEAD
import Milestones from "@/components/home/milestones";
import LatestModules from "@/components/home/latest-modules";
import FeaturesPage from "@/components/home/Features";
import { RealEstateServices } from "@/components/home/RealEstateServices";
import TestimonialCarousel from "@/components/home/testimonials";
import PricingSection from "@/components/home/pricing-section";
import PartnerCta from "@/components/home/partner-cta";
import Faq from "@/components/home/faq";
import Cta from "@/components/home/cta";
=======
import { RealEstateServices } from "@/components/home/RealEstateServices";
import FeaturesPage from "@/components/home/Features";
>>>>>>> niloy

export default function HomePage() {
  return (
    <div>
      <SiteShell>
        <Hero />
<<<<<<< HEAD
        <Milestones />
        <LatestModules />
        <FeaturesPage />
        <RealEstateServices />
        <TestimonialCarousel />
        <PricingSection />
        <PartnerCta />
        <Faq />
        <Cta />
=======
        <FeaturesPage />
        <RealEstateServices />
>>>>>>> niloy
      </SiteShell>
    </div>
  );
}

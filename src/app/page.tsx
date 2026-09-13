import { SiteShell } from "@/components/site/SiteNav";

import Hero from "@/components/home/Hero";
import { RealEstateServices } from "@/components/home/RealEstateServices";
import FeaturesPage from "@/components/home/Features";
import PricingSection from "@/components/home/pricing-section";
import Stats from "@/components/home/stats";
import Testimonials from "@/components/home/testimonials";
import Faq from "@/components/home/faq";
import Cta from "@/components/home/cta";

export default function HomePage() {
  return (
    <div>
      <SiteShell>
        <Hero />
        <Stats />
        <FeaturesPage />
        <RealEstateServices />
        <PricingSection />
        <Testimonials />
        <Faq />
        <Cta />
      </SiteShell>
    </div>
  );
}

import { SiteShell } from "@/components/site/SiteNav";

import Hero from "@/components/home/Hero";
import { RealEstateServices } from "@/components/home/RealEstateServices";
import FeaturesPage from "@/components/home/Features";

export default function HomePage() {
  return (
    <div>
      <SiteShell>
        <Hero />
        <FeaturesPage />
        <RealEstateServices />
      </SiteShell>
    </div>
  );
}

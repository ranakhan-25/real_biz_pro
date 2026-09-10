import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { BlogPreview } from "@/components/landing/blog-preview";
import { CaseStudies } from "@/components/landing/case-studies";
import { VideoDemo } from "@/components/landing/video-demo";
import { SecuritySection } from "@/components/landing/security-section";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { Integrations } from "@/components/landing/integrations";
import { UseCases } from "@/components/landing/use-cases";
import { ProductPreview } from "@/components/landing/product-preview";
import { StatsBar } from "@/components/landing/stats-bar";

export default function LandingPage() {
  return (
    <div className="bg-brand-canvas">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <LogoCloud />
        <ProductPreview />
        <UseCases />
        <Features />
        <HowItWorks />
        <Integrations />
        <ComparisonTable />
        <SecuritySection />
        <VideoDemo />
        <CaseStudies />
        <Testimonials />
        <Pricing />
        <BlogPreview />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

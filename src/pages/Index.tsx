
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { SupportedChains } from "@/components/supported-chains";
import { Partners } from "@/components/partners";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <SupportedChains />
        <Partners />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

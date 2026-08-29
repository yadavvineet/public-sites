import Hero from "@/components/sections/Hero";
import CompanyIntro from "@/components/sections/CompanyIntro";
import CapabilityCards from "@/components/sections/CapabilityCards";
import CrossMedium from "@/components/sections/CrossMedium";
import CustomSolutions from "@/components/sections/CustomSolutions";
import CorporateGifting from "@/components/sections/CorporateGifting";
import WhyV2K from "@/components/sections/WhyV2K";
import ContactCTA from "@/components/sections/ContactCTA";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

export const metadata = {
  title: "V2K Media | Digital, Print & Custom Business Solutions",
};

export default function HomePage() {
  return (
    <main>
      <RevealOnScroll>
        <Hero />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <CompanyIntro />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <CapabilityCards />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <CrossMedium />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <CustomSolutions />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <CorporateGifting />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <WhyV2K />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <ContactCTA />
      </RevealOnScroll>
    </main>
  );
}

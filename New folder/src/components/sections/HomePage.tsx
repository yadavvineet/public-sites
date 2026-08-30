import Hero from "./Hero";
import CompanyIntro from "./CompanyIntro";
import CapabilityCards from "./CapabilityCards";
import CrossMedium from "./CrossMedium";
import CustomSolutions from "./CustomSolutions";
import CorporateGifting from "./CorporateGifting";
import WhyV2K from "./WhyV2K";
import ContactCTA from "./ContactCTA";
import RevealOnScroll from "../shared/RevealOnScroll";

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

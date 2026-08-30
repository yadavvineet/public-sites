import Hero from "../components/Hero";
import CompanyIntro from "../components/CompanyIntro";
import CapabilityGrid from "../components/CapabilityGrid";
import CrossMedium from "../components/CrossMedium";
import CustomSolutions from "../components/CustomSolutions";
import CorporateGifting from "../components/CorporateGifting";
import WhyV2K from "../components/WhyV2K";
import ContactCTA from "../components/ContactCTA";
import RevealOnScroll from "../components/shared/RevealOnScroll";

export default function Home() {
  return (
    <main>
      <RevealOnScroll><Hero /></RevealOnScroll>
      <RevealOnScroll delay={100}><CompanyIntro /></RevealOnScroll>
      <RevealOnScroll delay={100}><CapabilityGrid /></RevealOnScroll>
      <RevealOnScroll delay={100}><CrossMedium /></RevealOnScroll>
      <RevealOnScroll delay={100}><CustomSolutions /></RevealOnScroll>
      <RevealOnScroll delay={100}><CorporateGifting /></RevealOnScroll>
      <RevealOnScroll delay={100}><WhyV2K /></RevealOnScroll>
      <RevealOnScroll delay={100}><ContactCTA /></RevealOnScroll>
    </main>
  );
}

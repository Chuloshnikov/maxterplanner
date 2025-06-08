import HeroSection from "@/components/home/sections/hero-section";
import FeaturesSection from "@/components/home/sections/features-section";
import BenefitsSection from "@/components/home/sections/benefits-section";
import CtaSection from "@/components/home/sections/cta-section";


export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      <FeaturesSection/>
      <BenefitsSection/>
      <CtaSection/>
    </div>
  );
}

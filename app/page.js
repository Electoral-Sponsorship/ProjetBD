import HeroSection from "./_components/HeroSection";
import ElecteursSection from "./_components/ElecteursSection";
import CandidatsSection from "./_components/CandidatsSection";
import AboutSection from "./_components/AboutSection";
import StepsSection from "./_components/StepsSection";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <StepsSection />
      <ElecteursSection />
      <CandidatsSection />
      <AboutSection />

    </div>
  );
}
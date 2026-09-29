import Hero from "./sections/Hero";
import { FeaturesSection, HowItWorksSection, TestimonialsSection } from "./sections/FeaturesAndProcess";
import { StatsSection, FeaturedCoursesSection, TrainerShowcaseSection, CTASection } from "./sections/ShowcaseSections";
import { Reveal } from "../../components/ui/Motion";

export default function Landing() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <Reveal><FeaturesSection /></Reveal>
      <Reveal><HowItWorksSection /></Reveal>
      <Reveal><FeaturedCoursesSection /></Reveal>
      <Reveal><TrainerShowcaseSection /></Reveal>
      <Reveal><TestimonialsSection /></Reveal>
      <Reveal><CTASection /></Reveal>
    </div>
  );
}

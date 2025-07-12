import FAQ from "@/components/FAQ";
import FeatureCards from "@/components/FeatureCards";
import Features from "@/components/Features";
import FeatureTimeline from "@/components/FeatureTimeline";
import HeroSection from "@/components/HeroSection";
import Quote from "@/components/Quote";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col gap-44">
      <HeroSection />
      <Quote />
      <Features />
      <Testimonials />
      <FeatureTimeline />
      <FeatureCards />
      <FAQ />
    </main>
  );
}
import FAQ from "@/components/FAQ";
import FeatureCards from "@/components/FeatureCards";
import Features from "@/components/Features";
import FeatureTimeline from "@/components/FeatureTimeline";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Quote from "@/components/Quote";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-44">
        <HeroSection />
        <Quote />
        <Features />
        <Testimonials />
        <FeatureTimeline />
        <FeatureCards />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

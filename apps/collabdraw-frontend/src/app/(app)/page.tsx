import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { Quote } from "@/components/Quote";

export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <Navbar />
      <HeroSection />
      <Quote />
      <Features />
      <Footer />
    </main>
  );
}
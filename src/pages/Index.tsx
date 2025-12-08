import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import SmartFeatures from "@/components/SmartFeatures";
import Security from "@/components/Security";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <Benefits />
        <Features />
        <SmartFeatures />
        <Security />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

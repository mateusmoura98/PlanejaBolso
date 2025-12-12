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
    // AQUI: w-full e overflow-x-hidden garantem que nada ultrapasse a largura da tela
    <div className="min-h-screen bg-white w-full overflow-x-hidden relative">
      <Header />
      
      <main className="w-full flex flex-col">
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

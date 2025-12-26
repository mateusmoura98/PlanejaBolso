import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
    <div className="min-h-screen bg-white w-full overflow-x-hidden relative">
      <Header />
      
      <main className="w-full flex flex-col">
        <Hero />
        
        {/* 1º VÍDEO: SmartFeatures (A Moça / Demo / Com Som) */}
        <SmartFeatures />

        {/* 2º VÍDEO: Features (O App / Planeja / Sem Som) */}
        <Features /> 
        
        <Benefits />
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

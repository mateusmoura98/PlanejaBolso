import Header from "@/components/Header";
import Hero from "@/components/Hero";
// VideoSection foi removido daqui pois agora ele está DENTRO do Features
import Benefits from "@/components/Benefits";
import Features from "@/components/Features"; // AQUI TEM O VÍDEO NOVO
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
        
        {/* Features agora tem o vídeo do celular embaixo do texto "Saiba para onde..." */}
        <Features /> 
        
        {/* SmartFeatures (Se tiver o gráfico antigo aqui, vamos ter que limpar ele depois) */}
        <SmartFeatures />

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

import { ShieldCheck, Zap, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const videoPath = "/video-demo.mp4"; 

const SmartFeatures = () => {
  return (
    <section id="funcionalidades" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* --- BLOCO DE TEXTO --- */}
          <div className="order-1 lg:order-1 w-full flex flex-col items-center lg:items-start">
            <div className="space-y-4 w-full text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mx-auto lg:mx-0 max-w-lg">
                Conheça o Planeja Bolso em menos de 1 minuto
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Simplifique sua gestão financeira com clareza, segurança e automação.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full mt-8">
              <div className="flex items-center gap-2 bg-green-100 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100">
                <ThumbsUp className="w-4 h-4" /> Fácil de usar
              </div>
              <div className="flex items-center gap-2 bg-green-100 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100">
                <ShieldCheck className="w-4 h-4" /> Seguro
              </div>
              <div className="flex items-center gap-2 bg-green-100 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100">
                <Zap className="w-4 h-4" /> Inteligência Artificial
              </div>
            </div>
          </div>

          {/* --- BLOCO DO VÍDEO (SEM MOLDURA / LIMPO) --- */}
          <div className="order-2 lg:order-2 w-full flex flex-col items-center">
            
            {/* VÍDEO LIMPO - SEM MOLDURA DE CELULAR */}
            <div className="relative w-full max-w-[260px] mx-auto mt-8 lg:mt-0 shadow-2xl rounded-[2rem]">
              <div className="overflow-hidden rounded-[2rem] aspect-[9/16] relative bg-black">
                <video
                  className="w-full h-full object-cover"
                  controls 
                  playsInline
                  preload="metadata"
                >
                  <source src={videoPath} type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>
            </div>

            {/* BOTÃO VERDE */}
            <div className="mt-12 w-full flex justify-center px-4">
              <Link to="/auth" className="w-full sm:w-auto">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Experimente Planeja Bolso — 3 dias grátis!
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SmartFeatures;

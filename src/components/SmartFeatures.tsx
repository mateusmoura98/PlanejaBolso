import { ShieldCheck, Zap, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const videoPath = "/video-demo.mp4"; 

const SmartFeatures = () => {
  return (
    <section id="funcionalidades" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col items-center">
        
        <div className="flex flex-col items-center w-full max-w-4xl">
          
          {/* --- BLOCO DE TEXTO E SELOS --- */}
          <div className="w-full flex flex-col items-center text-center space-y-6 mb-12">
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight max-w-2xl">
              Conheça o Planeja Bolso em menos de 1 minuto
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Simplifique sua gestão financeira com clareza, segurança e automação.
            </p>

            {/* Selos Centralizados */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
              <div className="flex items-center gap-2 bg-green-50 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100">
                <ThumbsUp className="w-4 h-4" /> Fácil de usar
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100">
                <ShieldCheck className="w-4 h-4" /> Seguro
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100">
                <Zap className="w-4 h-4" /> Inteligência Artificial
              </div>
            </div>

          </div>

          {/* --- BLOCO DO VÍDEO (CELULAR) --- */}
          <div className="w-full flex flex-col items-center">
            
            {/* MOLDURA DO CELULAR */}
            {/* Reduzi para max-w-[260px] para garantir margem no mobile */}
            <div className="relative w-full max-w-[260px] mx-auto">
              
              {/* Efeito de brilho atrás */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/20 rounded-full blur-[60px] -z-10" />

              <div className="relative z-10 bg-black rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-900 ring-1 ring-white/10">
                <div className="overflow-hidden rounded-[2rem] bg-gray-900 aspect-[9/16] relative bg-black">
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
                {/* Notch (Câmera) */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20 pointer-events-none" />
              </div>

            </div>

            {/* BOTÃO VERDE */}
            <div className="mt-12 w-full flex justify-center px-4">
              <a href="https://www.planejabolso.com/plano" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Experimente Planeja Bolso — 3 dias grátis!
                </Button>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SmartFeatures;

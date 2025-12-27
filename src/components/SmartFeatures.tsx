import { ShieldCheck, Zap, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// VÍDEO DA MOÇA (DEMO)
const videoPath = "/video-demo.mp4"; 

const SmartFeatures = () => {
  return (
    <section id="funcionalidades" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* GRID: Lado a Lado no PC (lg:grid-cols-2) | Empilhado no Celular (grid-cols-1) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* --- BLOCO 1: TEXTO E SELOS --- */}
          {/* order-1: Aparece primeiro no celular. Centralizado no Mobile, Esquerda no PC */}
          <div className="order-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            
            <div className="space-y-4 w-full">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mx-auto lg:mx-0 max-w-lg">
                Conheça o Planeja Bolso em menos de 1 minuto
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Simplifique sua gestão financeira com clareza, segurança e automação.
              </p>
            </div>

            {/* SELOS VERDES */}
            {/* justify-center no mobile | justify-start no PC */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full">
              <div className="flex items-center gap-2 bg-green-100 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100 whitespace-nowrap">
                <ThumbsUp className="w-4 h-4" /> Fácil de usar
              </div>
              <div className="flex items-center gap-2 bg-green-100 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100 whitespace-nowrap">
                <ShieldCheck className="w-4 h-4" /> Seguro
              </div>
              <div className="flex items-center gap-2 bg-green-100 text-primary px-4 py-2 rounded-full font-medium text-sm border border-green-100 whitespace-nowrap">
                <Zap className="w-4 h-4" /> Inteligência Artificial
              </div>
            </div>

          </div>

          {/* --- BLOCO 2: VÍDEO E BOTÃO --- */}
          {/* order-2: Aparece embaixo no celular. Centralizado SEMPRE */}
          <div className="order-2 w-full flex flex-col items-center">
            
            {/* CONTAINER DO CELULAR */}
            {/* mx-auto: Garante que fique no meio exato matematicamente */}
            <div className="relative w-full max-w-[260px] md:max-w-[300px] mx-auto">
              
              {/* Efeito de brilho atrás */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[80px] -z-10" />

              {/* MOLDURA DO CELULAR */}
              <div className="relative z-10 bg-black rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-900 ring-1 ring-white/10">
                
                {/* TELA DO VÍDEO */}
                <div className="overflow-hidden rounded-[2rem] bg-gray-900 aspect-[9/16] relative bg-black">
                  <video
                    className="w-full h-full object-cover"
                    controls // COM SOM E CONTROLES
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
            {/* justify-center: Garante alinhamento central */}
            <div className="mt-10 w-full flex justify-center">
              <Link to="/auth" className="w-full sm:w-auto flex justify-center">
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

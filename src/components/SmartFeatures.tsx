import { ShieldCheck, Zap, ThumbsUp } from "lucide-react";

// VÍDEO DO TOPO (A MOÇA)
const videoPath = "/video-demo.mp4"; 

const SmartFeatures = () => {
  return (
    <section id="funcionalidades" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        
        {/* --- TÍTULO E SUBTÍTULO --- */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Conheça o Planeja Bolso em menos de 1 minuto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplifique sua gestão financeira com clareza, segurança e automação.
          </p>
        </div>

        {/* --- SELOS (Tags verdes) --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-green-50 text-primary px-4 py-2 rounded-full font-medium text-sm">
            <ThumbsUp className="w-4 h-4" /> Fácil de usar
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-primary px-4 py-2 rounded-full font-medium text-sm">
            <ShieldCheck className="w-4 h-4" /> Seguro
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-primary px-4 py-2 rounded-full font-medium text-sm">
            <Zap className="w-4 h-4" /> Inteligência Artificial
          </div>
        </div>

        {/* --- VÍDEO CENTRALIZADO (Com Moldura) --- */}
        <div className="flex justify-center">
            <div className="relative w-full max-w-[280px] md:max-w-[300px]">
              
              {/* Efeito de brilho verde atrás */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[80px] -z-10" />

              {/* MOLDURA DO CELULAR */}
              <div className="relative z-10 bg-black rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-900 ring-1 ring-white/10">
                
                {/* TELA DO VÍDEO */}
                <div className="overflow-hidden rounded-[2rem] bg-gray-900 aspect-[9/16] relative">
                  <video
                    className="w-full h-full object-cover"
                    controls // COM SOM
                    playsInline
                    preload="metadata"
                  >
                    <source src={videoPath} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>

                {/* Detalhe da câmera (Notch) */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20 pointer-events-none" />
              </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default SmartFeatures;

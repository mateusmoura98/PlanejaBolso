import { Play, Shield, Zap, Bot } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          Conheça o Planeja Bolso em menos de 1 minuto
        </h2>
        
        {/* Subtítulo */}
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Simplifique sua gestão financeira com clareza, segurança e automação.
        </p>

        {/* Ícones (Badges) - AQUI ESTAVA O PROBLEMA */}
        {/* Adicionei 'justify-center' e 'flex-wrap' para centralizar no mobile */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-12">
          
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Fácil de usar</span>
          </div>

          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Seguro</span>
          </div>

          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <Bot className="w-5 h-5 text-primary" /> {/* Corrigi a cor aqui */}
            <span className="text-sm font-medium text-foreground">Inteligência Artificial</span>
          </div>

        </div>

        {/* Área do Vídeo */}
        <div className="relative w-full max-w-3xl mx-auto aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200 group cursor-pointer hover:shadow-xl transition-all">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-primary ml-1 fill-primary" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500">Clique para assistir</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VideoSection;

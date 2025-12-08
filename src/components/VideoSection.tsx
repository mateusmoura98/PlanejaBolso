import { Shield, Zap, Brain } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Conheça o Planeja Bolso em menos de 1 minuto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplifique sua gestão financeira com clareza, segurança e automação.
          </p>

          {/* Value Tags */}
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Fácil de usar</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-secondary" />
              </div>
              <span className="font-medium">Inteligência Artificial</span>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden shadow-elegant bg-muted aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <svg
                  className="w-10 h-10 text-primary ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-muted-foreground font-medium">Clique para assistir</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

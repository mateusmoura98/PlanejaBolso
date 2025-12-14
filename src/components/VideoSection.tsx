import { Shield, Zap, Bot } from "lucide-react"; // Removi o 'Play' pois o vídeo nativo já tem

const VideoSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          Conheça o Planeja Bolso em menos de 1 minuto
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Simplifique sua gestão financeira com clareza, segurança e automação.
        </p>

        {/* Ícones */}
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
            <Bot className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Inteligência Artificial</span>
          </div>
        </div>

        {/* ÁREA DO VÍDEO REAL */}
        <div className="relative w-full max-w-[320px] mx-auto aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-100">
          
          {/* TAG DE VÍDEO HTML5 */}
          <video 
            className="w-full h-full object-cover" // object-cover faz o vídeo preencher tudo sem borda preta
            controls // Mostra os botões de play/pause/volume
            playsInline // Importante para funcionar bem no iPhone
            // poster="/capa-do-video.jpg" <--- Se quiser uma imagem de capa antes de dar play, coloque na pasta public e descomente aqui
          >
            {/* O CAMINHO DO VÍDEO NA PASTA PUBLIC */}
            <source src="/video-demo.mp4" type="video/mp4" />
            Seu navegador não suporta a exibição de vídeos.
          </video>

        </div>

      </div>
    </section>
  );
};

export default VideoSection;

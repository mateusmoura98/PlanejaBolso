import { Camera, Bell, Search, Sparkles } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Registre suas despesas e receitas por foto, áudio ou texto",
    description: "Múltiplas formas de entrada para sua conveniência. Tire foto da nota ou mande um áudio.",
  },
  {
    icon: Bell,
    title: "Lembretes Inteligentes, na hora certa",
    description: "Nunca mais esqueça de uma conta importante. Receba avisos no WhatsApp.",
  },
  {
    icon: Search,
    title: "Consulte suas movimentações em tempo real",
    description: "Acesso instantâneo ao seu histórico financeiro. Pergunte ao robô e ele responde.",
  },
  {
    icon: Sparkles,
    title: "Categorização e Subcategoria Automática",
    description: "IA que aprende com seus padrões de gastos e organiza tudo sozinha.",
  },
];

// VÍDEO DO TOPO: DEMO (COM SOM)
const videoPath = "/video-demo.mp4"; 

const SmartFeatures = () => {
  return (
    <section id="funcionalidades" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Funcionalidades Inteligentes do Planeja Bolso
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LADO ESQUERDO (LISTA) */}
          <div className="space-y-6 order-2 md:order-1">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- LADO DIREITO (VÍDEO COM SOM E FRASE) --- */}
          <div className="order-1 md:order-2 flex flex-col items-center justify-center">
            
            {/* FRASE SOLICITADA */}
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8 text-foreground max-w-xs leading-tight">
              Conheça o Planeja Bolso em menos de 1 minuto
            </h3>
            
            <div className="relative w-full max-w-[280px] md:max-w-[300px]">
              
              {/* Efeito de brilho verde atrás */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[80px] -z-10" />

              {/* MOLDURA DO CELULAR */}
              <div className="relative z-10 bg-black rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-900 ring-1 ring-white/10">
                
                {/* TELA COM O VÍDEO */}
                <div className="overflow-hidden rounded-[2rem] bg-gray-900 aspect-[9/16] relative">
                  <video
                    className="w-full h-full object-cover"
                    controls // COM SOM (Controles ativados)
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
      </div>
    </section>
  );
};

export default SmartFeatures;

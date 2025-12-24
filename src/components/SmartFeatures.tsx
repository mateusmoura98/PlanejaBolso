import { Camera, Bell, Search, Sparkles } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Registre suas despesas e receitas por foto, áudio ou texto",
    description: "Múlttitle: "Consulte em tempo real",
    description: "Acesso instantâneo ao seu histórico financeiro. Pergunte aoiplas formas de entrada para sua conveniência.",
  },
  {
    icon: Bell,
 robô e ele responde."
  },
  {
    icon: Zap,
    title: "Categorização Automática",
    title: "Lembretes Inteligentes, na hora certa",
    description: "Nunca mais esqueça de uma conta importante.",
  },
  {
    icon: Search,
    title: "Consulte suas    description: "IA que aprende com seus padrões de gastos e organiza tudo sozinho."
  }
];

// Camin movimentações em tempo real",
    description: "Acesso instantâneo ao seu histórico financeiro.",
  },
  {
    icon: Sparkles,
    title: "Categorização e Subcategoria Automática",ho do vídeo (Coloque o arquivo na pasta public)
const videoPath = "/demo-app.mp4
    description: "IA que aprende com seus padrões de gastos.",
  },
];

const SmartFeatures ="; 

const SmartFeatures = () => {
  return (
    <section className="py-24 () => {
  return (
    <section id="funcionalidades" className="py-24 bg-white overflow bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        
-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Título da Seção */}
        <div className="text-center mb-16        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground-3xl md:text-4xl font-bold text-foreground">
            Funcionalidades Inteligentes do Planeja Bolso
          </h2>
        </div>

        <div className="grid lg:grid-cols-2">
            Funcionalidades Inteligentes do Planeja Bolso
          </h2>
        </div>

        <div className="grid md:grid- gap-16 items-center max-w-6xl mx-auto">
          
          {/* ---cols-2 gap-12 items-center">
          
          {/* LADO ESQUERDO: LISTA DE FUNÇÕES */}
          <div className="space-y-6 order-2 md:order-1">
            {features. LADO ESQUERDO (LISTA) --- */}
          <div className="space-y-6 order-2 lg:ordermap((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-1">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-4 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-all duration-sm hover:shadow-md transition-all hover:border-primary/20 group"
              >
                <div-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 text className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <feature.h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>

                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{feature.                </div>
              </div>
            ))}
          </div>

          {/* LADO DIREITO: VÍDEOtitle}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          { NO CELULAR (CENTRALIZADO) */}
          <div className="order-1 md:order-2 flex justify/* --- LADO DIREITO (VÍDEO 9:16) --- */}
          <div className="order-1 lg:order-2 flex justify-center">
            
            {/* Container do Celular */}-center relative">
            
            {/* Efeito de fundo (Glow) */}
            <div className="absolute top-1/2
            <div className="relative w-full max-w-[280px] md:max-w left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3-[300px]">
              
              {/* Efeito de brilho verde atrás */}
              <div className="absolute top00px] h-[300px] bg-primary/20 rounded-full blur-[80px] -z-10-1/2 left-1/2 -translate-x-1/2 -translate-y-1/" />

            {/* MOLDURA DO CELULAR */}
            <div className="relative w-full max-w-[282 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[80px] bg-black rounded-[2.5rem] p-2 shadow-2xl border-4 border0px] -z-10" />

              {/* MOLDURA DO CELULAR */}
              <div className="relative z-gray-900 ring-1 ring-black/5">
              
              {/* Câmera/-10 bg-black rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-900 ring-1 ring-white/10">
                
                {/* A Tela do VídeoDynamic Island fake */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h */}
                <div className="overflow-hidden rounded-[2rem] bg-gray-900 aspect-[-6 w-24 bg-black rounded-b-xl z-20"></div>

              {/* T9/16] relative">
                  <video 
                    className="w-full h-full object-cover"
                    autoELA COM O VÍDEO */}
              <div className="overflow-hidden rounded-[2rem] bg-gray-900 aspect-[9/16] relative">
                <video
                  className="w-full h-fullPlay 
                    loop 
                    muted 
                    playsInline
                    controlsList="nodownload"
                    poster="/dashboard-preview.png" // Imagem de capa enquanto carrega (opcional)
                  >
                    <source src={videoPath} type="video/mp4" />
                    Seu navegador não suporta vídeos.
 object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  // Se o vídeo demorar a carregar, mostra uma cor de fundo ou poster
                  poster="/dashboard-preview.png" 
                >
                  <source src="/video-demo.mp4" type="video/mp4" />
                  Seu navegador                  </video>
                  
                  {/* Overlay sutil para garantir leitura se tiver texto branco no vídeo */}
                  <div className não suporta vídeos.
                </video>
                
                {/* Overlay opcional para deixar o vídeo mais="absolute inset-0 ring-1 ring-black/5 rounded-[2rem] pointer-events-none" />
                </div>

 elegante */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to                {/* Detalhe da câmera do celular (Notch) */}
                <div className="absolute top-6-transparent pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SmartFeatures;

import { PieChart, Users, CreditCard } from "lucide-react";

const features = [
  {
    icon: PieChart,
    title: "Gastos e receitas organizados",
    description: "Identifique automaticamente suas despesas e receitas com inteligência artificial."
  },
  {
    icon: Users,
    title: "Perfeito para casais e famílias",
    description: "Controle as finanças de múltiplos usuários em um só lugar."
  },
  {
    icon: CreditCard,
    title: "Controle total de contas",
    description: "Acompanhe contas bancárias e cartões de crédito com lembretes automáticos."
  }
];

// VÍDEO 2: O APP (PLANEJA)
const videoPath = "/video-planeja.mp4";

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- LADO ESQUERDO: VÍDEO (SEM SOM / AUTOPLAY) --- */}
          <div className="order-1 lg:order-1 flex justify-center w-full">
            <div className="relative w-full max-w-[280px] md:max-w-[300px]">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[80px] -z-10" />

              <div className="relative z-10 bg-black rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-900 ring-1 ring-white/10">
                <div className="overflow-hidden rounded-[2rem] bg-gray-900 aspect-[9/16] relative">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={videoPath} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                  {/* Sombra interna leve */}
                  <div className="absolute inset-0 ring-1 ring-black/5 rounded-[2rem] pointer-events-none" />
                </div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* --- LADO DIREITO: TEXTOS --- */}
          <div className="order-2 lg:order-2 space-y-8 mt-8 lg:mt-0">
            
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Saiba para onde seu dinheiro está indo
              </h2>
              <p className="text-lg text-muted-foreground">
                Identificação automática de categorias e subcategorias usando inteligência artificial.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;

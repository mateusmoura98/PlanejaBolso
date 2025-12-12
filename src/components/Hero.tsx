import { Button } from "@/components/ui/button";
import { CheckCircle2, User } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    // AJUSTE 1: Diminuí o padding do topo no mobile (pt-28) para não comer muita tela
    <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        
        {/* AJUSTE 2: grid-cols-1 (1 coluna no celular) e md:grid-cols-2 (2 no PC) */}
        {/* gap-10 no celular (menor) e gap-12 no PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          
          {/* LADO ESQUERDO (Texto) */}
          <div className="space-y-6 md:space-y-8 text-left order-1">
            
            {/* AJUSTE 3: Texto menor no celular (text-3xl) para não quebrar linhas erradas */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] md:leading-[1.1]">
              Gestão financeira simplificada com{" "}
              <span className="text-primary block md:inline">WhatsApp</span> e{" "}
              <span className="text-primary block md:inline">Inteligência Artificial</span>
            </h1>

            {/* Prova Social */}
            <div className="flex flex-wrap items-center gap-3 p-3 md:p-4 bg-white rounded-xl shadow-sm border border-gray-100 w-fit">
              <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center"><User className="w-4 h-4 text-gray-500" /></div>
                 <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"><User className="w-4 h-4 text-gray-600" /></div>
                 <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center"><User className="w-4 h-4 text-gray-700" /></div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">
                <span className="font-bold text-foreground">+28 mil pessoas</span> confiam no Planeja Bolso.
              </p>
            </div>

            {/* Botão e Checkmarks */}
            <div className="space-y-5">
              <Link to="/auth" className="block w-full md:w-auto">
                <Button 
                  className="w-full md:w-auto h-auto px-6 py-4 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Experimente Planeja Bolso — 3 dias grátis!
                </Button>
              </Link>

              {/* AJUSTE 4: Checkmarks um embaixo do outro no mobile (flex-col) */}
              <div className="flex flex-col sm:flex-row items-start gap-3 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>3 dias grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Cancele quando quiser</span>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO (Imagem Dashboard) */}
          {/* order-2 garante que fique embaixo do texto no celular */}
          <div className="relative w-full max-w-lg mx-auto md:max-w-none mt-4 md:mt-0 order-2">
            <div className="relative z-10 bg-white rounded-3xl p-2 shadow-2xl border border-gray-100">
              <div className="aspect-[4/3] bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden relative">
                <div className="text-center space-y-4 p-4 md:p-8 z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-lg md:text-xl">Dashboard do Planeja Bolso</p>
                    <p className="text-muted-foreground text-xs md:text-sm">Seus gráficos aparecerão aqui</p>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

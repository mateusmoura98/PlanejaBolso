import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LADO ESQUERDO */}
          <div className="space-y-8 text-left">
            
            {/* TÍTULO COM LETRA GROSSA (font-extrabold) */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Gestão financeira simplificada com{" "}
              <span className="text-primary">WhatsApp</span> e{" "}
              <span className="text-primary">Inteligência Artificial</span>
            </h1>

            {/* Prova Social */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 w-fit">
              <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">U</div>
                 <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">U</div>
                 <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">U</div>
              </div>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                <span className="font-bold text-foreground">+28 mil pessoas</span> confiam no Planeja Bolso.
              </p>
            </div>

            {/* Botão e Checkmarks */}
            <div className="space-y-5">
              <Link to="/auth">
                <Button 
                  className="w-full md:w-auto h-auto px-8 py-4 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Experimente Planeja Bolso — 3 dias grátis!
                </Button>
              </Link>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>3 dias grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Cancele quando quiser</span>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO (Imagem Dashboard) */}
          <div className="relative w-full max-w-lg mx-auto md:max-w-none mt-8 md:mt-0">
            <div className="relative z-10 bg-white rounded-3xl p-2 shadow-2xl border border-gray-100">
              <div className="aspect-[4/3] bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden relative">
                <div className="text-center space-y-4 p-8 z-10">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-xl">Dashboard do Planeja Bolso</p>
                    <p className="text-muted-foreground text-sm">Seus gráficos aparecerão aqui</p>
                  </div>
                </div>
                
                {/* Efeitos de fundo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              </div>
            </div>
            
            {/* Decoração atrás */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

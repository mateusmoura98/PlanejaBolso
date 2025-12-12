import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LADO ESQUERDO: Texto alinhado à esquerda (Padrão Original) */}
          <div className="space-y-8 text-left">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Gestão financeira simplificada com{" "}
              <span className="text-primary">WhatsApp</span> e{" "}
              <span className="text-primary/80">Inteligência Artificial</span>
            </h1>

            {/* Caixa de Prova Social */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md border border-gray-100 w-fit">
              <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-sm md:text-base text-muted-foreground">
                <span className="font-semibold text-foreground">+28 mil pessoas</span> confiam no
                Planeja Bolso para organizar suas finanças.
              </p>
            </div>

            {/* Botões e Links */}
            <div className="space-y-4">
              <Link to="/auth">
                <Button 
                  size="xl" 
                  className="w-full md:w-auto text-lg px-8 py-6 h-auto font-bold bg-primary hover:bg-primary/90 text-white shadow-lg transition-all hover:scale-105"
                >
                  Experimente Planeja Bolso — 3 dias grátis!
                </Button>
              </Link>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-muted-foreground">
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

          {/* LADO DIREITO: Imagem do Dashboard */}
          <div className="relative w-full max-w-lg mx-auto md:max-w-none mt-8 md:mt-0">
            <div className="relative z-10 bg-white rounded-3xl p-2 shadow-2xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[4/3] bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden relative">
                {/* Simulando o Dashboard da imagem */}
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
                    <p className="text-foreground font-bold text-lg">Dashboard do Planeja Bolso</p>
                    <p className="text-muted-foreground text-sm">Seus gráficos aparecerão aqui</p>
                  </div>
                </div>
                
                {/* Efeito de fundo suave */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              </div>
            </div>
            
            {/* Bolhas decorativas no fundo */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

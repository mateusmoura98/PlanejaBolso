import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Users } from "lucide-react";

const Hero = () => {
  return (
    // Fundo branco puro (bg-white) sem degradês
    <section className="pt-32 pb-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* --- LADO ESQUERDO: TEXTO --- */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground tracking-tight">
              Gestão financeira simplificada com{" "}
              {/* Texto verde sólido */}
              <span className="text-primary block">WhatsApp e</span>
              <span className="text-primary block">Inteligência Artificial</span>
            </h1>

            {/* Prova Social Simples */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center"><Users className="w-4 h-4 text-gray-500"/></div>
                 <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"><Users className="w-4 h-4 text-gray-500"/></div>
                 <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center"><Users className="w-4 h-4 text-gray-500"/></div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">+28 mil pessoas</span> confiam no Planeja Bolso.
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/auth">
                {/* BOTÃO SÓLIDO (SEM DEGRADÊ) */}
                {/* bg-primary puxa o verde exato do index.css */}
                <Button 
                  className="w-full md:w-auto bg-primary hover:bg-[#005c32] text-white font-bold text-lg h-14 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
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

          {/* --- LADO DIREITO: IMAGEM LIMPA --- */}
          <div className="relative group">
            {/* Fundo decorativo suave (Sólido, sem blur excessivo) */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-2" />
            
            {/* Card Branco Principal */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-2">
              <div className="aspect-[4/3] bg-white rounded-xl flex items-center justify-center overflow-hidden">
                {/* Aqui simula a tela do Dashboard (Placeholder) */}
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center shadow-md">
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
                    <p className="font-bold text-gray-900">Dashboard do Planeja Bolso</p>
                    <p className="text-sm text-gray-500">Seus gráficos aparecerão aqui</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

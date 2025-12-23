import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";
import { Link } from "react-router-dom";

// AQUI: O caminho da imagem que você salvou na pasta public
const dashboardPreview = "/dashboard-preview.png";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid Users } from "lucide-react";
import { Link } from "react-router-dom";

// AQUI: O caminho da imagem que você salvou na pasta public
const dashboardPreview = "/dashboard-preview.png";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Lado Esquerdo (Texto) */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center md:text-left">
              Gestão financeira simplificada com{" "}
              <span className="text-primary">WhatsApp</span> e{" "}
              <span className="text-secondary">Inteligência Artificial</span>
            </h1>

            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md border border-gray-100">
              <Users className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <p className="text-sm md:text-base text-muted-foreground">
                <span className="font-semibold text-foreground">+28 mil pessoas</span> confiam no
                Planeja Bolso para organizar suas finanças, e você?
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/auth" className="flex justify-center md:justify-start">
                <Button variant="cta" size="xl" className="w-full md:w-auto shadow-lg hover:shadow-xl transition-all">
                  Experimente Planeja Bolso — 3 dias grátis!
                </Button>
              </Link>

              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>3 dias grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>Cancele quando quiser</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito (A IMAGEM DA DASHBOARD) */}
          {/* ADICIONEI: 'flex justify-center' no pai e 'w-full max-w-[320px] mx-auto' md:grid-cols-2 gap-12 items-center">
          
          {/* Lado Esquerdo (Texto) */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Gestão financeira simplificada com{" "}
              <span className="text-primary">WhatsApp</span> e{" "}
              <span className="text-secondary">Inteligência Artificial</span>
            </h1>

            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md border border-gray-100">
              <Users className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <p className="text-sm md:text-base text-muted-foreground">
                <span className="font-semibold text-foreground">+28 mil pessoas</span> confiam no
                Planeja Bolso para organizar suas finanças, e você?
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/auth">
                <Button variant="cta" size="xl" className="w-full md:w-auto shadow-lg hover:shadow-xl transition-all">
                  Experimente Planeja Bolso — 3 dias grátis!
                </Button>
              </Link>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>3 dias grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>Cancele quando quiser</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito (A IMAGEM DA DASHBOARD) */}
          {/* AQUI ESTÃO AS MUDANÇAS DE CENTRALIZAÇÃO: */}
          <div className="relative mt-8 md:mt-0 w-full max-w-[300px] mx-auto md:max-w-full md:mx-0">
            
            {/* Fundo decorativo */}
            <div className="absolute -top-4 -right-4 w-3/4 h-3/4 bg-primary/10 rounded-full blur-3xl -z-10" />
            
            <div className="relative z-10 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500">
              {/* Moldura tipo navegador */}
              <div className="bg-gray-50 border-b p-3 flex gap-2 rounded-t-xl">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              
              {/* MUDANÇA: aspect-[9/16] (Formato Celular) e object-contain (Não corta nada) */}
              <div className="overflow-hidden rounded-b-xl bg-gray-50 aspect-[9/16] relative">
                <img 
                  src={dashboardPreview} 
                  alt="Dashboard Planeja Bolso" 
                  className="w-full h-full object-contain bg-white na div da imagem para centralizar */}
          <div className="relative mt-8 md:mt-0 flex justify-center">
            
            <div className="relative w-full max-w-[300px] md:max-w-md mx-auto">
                {/* Fundo decorativo (Ajustado para não vazar a tela) */}
                <div className="absolute -top-4 -right-4 w-3/4 h-3/4 bg-primary/10 rounded-full blur-3xl -z-10" />
                
                <div className="relative z-10 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500">
                  {/* Moldura tipo navegador */}
                  <div className="bg-gray-50 border-b p-3 flex gap-2 rounded-t-xl">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  
                  {/* Imagem Formato 9:16 (Celular) */}
                  <div className="overflow-hidden rounded-b-xl bg-gray-50 aspect-[9/16]">
                    <img 
                      src={dashboardPreview} 
                      alt="Dashboard Planeja Bolso" 
                      className="w-full h-full object-cover object-top"
                    />
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

import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      {/* Ajustei a largura máxima para o texto não ficar muito espalhado */}
      <div className="container mx-auto max-w-4xl text-center">
        
        <div className="space-y-8 flex flex-col items-center">
          
          {/* TÍTULO */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Gestão financeira simplificada com{" "}
            <span className="text-primary">WhatsApp</span> e{" "}
            <span className="text-secondary">Inteligência Artificial</span>
          </h1>

          {/* PROVA SOCIAL (BOX) */}
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 max-w-lg text-left">
            <Users className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
            <p className="text-sm md:text-base text-muted-foreground">
              <span className="font-semibold text-foreground">+28 mil pessoas</span> confiam no
              Planeja Bolso para organizar suas finanças, e você?
            </p>
          </div>

          {/* BOTÃO E CHAMADA (CTA) */}
          <div className="space-y-6 w-full flex flex-col items-center">
            <Link to="/auth">
              {/* REMOVI O DEGRADÊ. Agora é cor sólida (bg-primary) */}
              <Button 
                size="xl" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold text-lg px-10 py-6 rounded-xl shadow-md transition-all"
              >
                Experimente Planeja Bolso — 3 dias grátis!
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
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

      </div>
    </section>
  );
};

export default Hero;

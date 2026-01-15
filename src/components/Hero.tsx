import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        
        <div className="space-y-8 flex flex-col items-center">
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Gestão financeira simplificada com{" "}
            <span className="text-primary">WhatsApp e Inteligência Artificial</span>
          </h1>

          <div className="flex items-start gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg text-left">
            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <p className="text-sm md:text-base text-muted-foreground">
              O Planeja Bolso é um agente financeiro que funciona direto no WhatsApp. Você conversa, registra gastos e receitas, e o sistema organiza tudo de forma simples e clara, sem baixar nada.
            </p>
          </div>

          <div className="space-y-6 w-full flex flex-col items-center px-4">
            {/* LINK EXTERNO PARA O PLANO */}
            <Button 
              asChild 
              size="xl" 
              className="w-full max-w-sm h-auto min-h-[60px] bg-primary hover:bg-primary/90 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all whitespace-normal text-center leading-tight"
            >
              <a href="https://www.planejabolso.com/plano" target="_blank" rel="noopener noreferrer">
                Experimente Planeja Bolso <br className="sm:hidden" /> — 3 dias grátis!
              </a>
            </Button>

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

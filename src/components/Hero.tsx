import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";
import { Link } from "react-router-dom";
const Hero = () => {
  return <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        
        <div className="space-y-8 flex flex-col items-center">
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Gestão financeira simplificada com{" "}
            <span className="text-primary">WhatsApp e Inteligência Artificial</span>
          </h1>

          <div className="flex items-start gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg text-left">
            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <p className="text-sm md:text-base text-muted-foreground">O Planeja Bolso O PlanejaBolso é um agente financeiro no WhatsApp que organiza sua vida financeira por conversa.

Você fala, registra gastos e receitas sem curva de aprendizado ou novos apps.
O sistema organiza tudo para você enxergar e decidir melhor.<span className="font-semibold text-foreground">O Planeja Bolso</span> confiam no
              Planeja Bolso para organizar suas finanças, e você?
            </p>
          </div>

          <div className="space-y-6 w-full flex flex-col items-center">
            {/* LINK DIRETO PARA O CHECKOUT */}
            <Link to="/checkout" state={{
            plan: {
              name: "Individual",
              value: "14,90"
            }
          }} // Define o padrão
          >
              <Button size="xl" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
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
    </section>;
};
export default Hero;
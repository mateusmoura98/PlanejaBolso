import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // Importando Link

const Benefits = () => {
  return (
    <section id="funcionalidades" className="py-20 px-4 bg-muted/20"> {/* Ajustei o fundo para combinar */}
      <div className="container mx-auto max-w-4xl text-center space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
            Organize seu dinheiro de um jeito simples e eficiente!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Não perca mais tempo com planilhas! Junte-se ao Planeja Bolso e tenha controle total das suas finanças.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* BOTÃO CORRIGIDO E LINDO */}
          <Button 
            asChild 
            size="xl" 
            className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg transition-transform hover:scale-105"
          >
            <Link to="/checkout" className="flex items-center justify-center gap-2">
              Experimente Gratuitamente 3 dias!
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>3 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Benefits;

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Benefits = () => {
  return (
    <section id="funcionalidades" className="py-20 px-4 bg-gradient-accent">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Organize seu dinheiro de um jeito simples e eficiente!
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Não perca mais tempo com planilhas! Junte-se ao Planeja Bolso e tenha controle total das
          suas finanças.
        </p>

        {/* LINK EXTERNO PARA O PLANO */}
        <Button 
          asChild
          size="xl" 
          className="group mb-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <a href="https://www.planejabolso.com/plano" target="_blank" rel="noopener noreferrer">
            Experimente Planeja Bolso — 3 dias grátis!
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
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
    </section>
  );
};

export default Benefits;

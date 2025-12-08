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

        <Button variant="secondary" size="lg" className="group mb-6">
          Experimente Planeja Bolso Gratuitamente!
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
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
    </section>
  );
};

export default Benefits;

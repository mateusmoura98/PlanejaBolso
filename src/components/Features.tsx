import { PieChart, Users, CreditCard, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Tag,
      title: "Gastos e receitas organizados por categoria e subcategoria",
      description:
        "Identifique automaticamente suas despesas e receitas com inteligência artificial",
    },
    {
      icon: Users,
      title: "Mapeie quem está gastando: perfeito para casal, família ou empresa",
      description: "Controle as finanças de múltiplos usuários em um só lugar",
    },
    {
      icon: CreditCard,
      title: "Controle conta bancária, cartão de crédito, e receba lembretes",
      description: "Acompanhe contas a pagar e a receber com lembretes inteligentes",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Saiba para onde seu dinheiro está indo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Identificação automática de categorias e subcategorias usando inteligência artificial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8">
              <div className="aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <PieChart className="w-32 h-32 text-primary" />
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

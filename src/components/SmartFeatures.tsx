import { Camera, Bell, Search, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const SmartFeatures = () => {
  const features = [
    {
      icon: Camera,
      title: "Registre suas despesas e receitas por foto, áudio, texto ou PDF",
      description: "Múltiplas formas de entrada para sua conveniência",
    },
    {
      icon: Bell,
      title: "Lembretes Inteligentes, na hora certa",
      description: "Nunca mais esqueça de uma conta importante",
    },
    {
      icon: Search,
      title: "Consulte suas movimentações em tempo real",
      description: "Acesso instantâneo ao seu histórico financeiro",
    },
    {
      icon: Sparkles,
      title: "Categorização e Subcategoria Automática",
      description: "IA que aprende com seus padrões de gastos",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Funcionalidades Inteligentes do Planeja Bolso
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Features */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-3xl p-8">
              <div className="aspect-[3/4] bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">Interface do WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartFeatures;

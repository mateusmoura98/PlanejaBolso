import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Individual",
    price: "14,90",
    description: "Para você dominar seu dinheiro",
    features: [
      "Controle de gastos automático",
      "Receba lembretes de contas",
      "Assistente sempre pronto",
      "Acesso Individual"
    ],
    highlight: false,
    link: "https://www.planejabolso.com/checkout" // Link Individual
  },
  {
    name: "Casal",
    price: "24,90",
    description: "Para organizar a vida a dois",
    features: [
      "Tudo do plano individual",
      "Acesso para 2 pessoas",
      "Gestão financeira compartilhada",
      "Suporte prioritário"
    ],
    highlight: true, // Destaque visual
    link: "https://www.planejabolso.com/checkout" // Link Casal
  }
];

const Pricing = () => {
  return (
    <section id="planos" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Escolha o Plano Ideal para Você
          </h2>
          <p className="text-lg text-muted-foreground">
            Sem fidelidade. Cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? "bg-white border-2 border-primary shadow-2xl scale-105 z-10"
                  : "bg-gray-50 border border-gray-200 hover:shadow-lg"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  Mais Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-primary" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold">R$ {plan.price}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${plan.highlight ? "bg-primary/20" : "bg-gray-200"}`}>
                      <Check className={`w-4 h-4 ${plan.highlight ? "text-primary" : "text-gray-600"}`} />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={plan.link} target="_blank" rel="noreferrer">
                <Button 
                  className={`w-full h-14 text-lg font-bold rounded-full transition-all shadow-lg hover:shadow-xl ${
                    plan.highlight 
                      ? "bg-primary hover:bg-primary/90 text-white" 
                      : "bg-primary hover:bg-primary/90 text-white" // Ambos verdes agora
                  }`}
                >
                  Assinar {plan.name}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

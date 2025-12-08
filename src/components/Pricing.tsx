import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  const plans = [
    {
      name: "Premium",
      priceMonthly: "R$ 14,90",
      priceAnnual: "R$ 299,00",
      discount: "10%",
      features: [
        { name: "Categorização automática", included: true },
        { name: "Múltiplos usuários", included: true },
        { name: "Lembretes inteligentes", included: true },
        { name: "Suporte prioritário", included: false },
        { name: "Relatórios avançados", included: false },
      ],
      highlighted: false,
    },
    {
      name: "Planeja",
      priceMonthly: "R$ 49,90",
      priceAnnual: "R$ 479,00",
      discount: "20%",
      features: [
        { name: "Categorização automática", included: true },
        { name: "Múltiplos usuários", included: true },
        { name: "Lembretes inteligentes", included: true },
        { name: "Suporte prioritário", included: true },
        { name: "Relatórios avançados", included: true },
      ],
      highlighted: true,
    },
  ];

  return (
    <section id="planos" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha o Plano Ideal para Você
          </h2>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg mt-6">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-md transition-all font-medium ${
                billingCycle === "annual"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Anual (com desconto)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md transition-all font-medium ${
                billingCycle === "monthly"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Mensal
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 relative ${
                plan.highlighted
                  ? "border-2 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5"
                  : "border-2"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Mais Popular
                </div>
              )}

              <div className="absolute top-4 right-4 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                {plan.discount} de Desconto
              </div>

              <h3 className="text-2xl font-bold mb-2 mt-4">{plan.name}</h3>

              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-1">
                  {billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly}
                </div>
                <div className="text-sm text-muted-foreground">
                  {billingCycle === "annual" ? "/ano" : "/mês"}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "cta" : "outline"}
                size="lg"
                className="w-full"
              >
                Seja {plan.name}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

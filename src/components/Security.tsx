import { Shield, Lock, Server } from "lucide-react";
import { Card } from "@/components/ui/card";

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Comunicação Segura",
      description:
        "Utilizamos a criptografia de ponta a ponta do WhatsApp para garantir que suas mensagens e dados financeiros permaneçam privados.",
    },
    {
      icon: Lock,
      title: "Seus Dados São Seus",
      description:
        "Não usamos seus dados financeiros para treinar IA. Sua privacidade é fundamental e suas informações jamais serão compartilhadas.",
    },
    {
      icon: Server,
      title: "Proteção Avançada",
      description:
        "Servidores seguros com backups automáticos e protocolos de segurança de última geração para proteger suas informações.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sua segurança é nossa prioridade
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/20"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Security;

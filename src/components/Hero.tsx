import { Button } from "@/components/ui/button";
import { CheckCircle2, Users } from "lucide-react";
import { Link } from "react-router-dom"; // <--- Adicionei este import

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Gestão financeira simplificada com{" "}
              <span className="text-primary">WhatsApp</span> e{" "}
              <span className="text-secondary">Inteligência Artificial</span>
            </h1>

            {/* Social Proof */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md">
              <Users className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <p className="text-sm md:text-base text-muted-foreground">
                <span className="font-semibold text-foreground">+28 mil pessoas</span> confiam no
                Planeja Bolso para organizar suas finanças, e você?
              </p>
            </div>

            {/* CTA - Botão modificado para levar ao Login */}
            <div className="space-y-4">
              <Link to="/auth">
                <Button variant="cta" size="xl" className="w-full md:w-auto">
                  Experimente Planeja Bolso — 3 dias grátis!
                </Button>
              </Link>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          </div>

          {/* Right Visual - Placeholder for app mockup */}
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 shadow-elegant">
              <div className="aspect-[4/3] bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Dashboard do Planeja Bolso
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

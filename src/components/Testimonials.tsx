import { Star, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      content:
        "O Planeja Bolso transformou a forma como gerencio as finanças da minha empresa. A categorização automática economiza horas do meu tempo!",
      rating: 5,
      avatar: "MS",
      hasAudio: false,
    },
    {
      name: "João Santos",
      role: "Contador",
      content:
        "Recomendo para todos os meus clientes. A integração com WhatsApp torna tudo muito mais prático e acessível.",
      rating: 5,
      avatar: "JS",
      hasAudio: true,
    },
    {
      name: "Ana Costa",
      role: "Freelancer",
      content:
        "Finalmente consegui organizar minhas receitas e despesas de forma simples. Os lembretes me salvam todos os meses!",
      rating: 5,
      avatar: "AC",
      hasAudio: false,
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que Nossos Usuários Dizem</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-secondary">
                  <AvatarFallback className="text-white font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {testimonial.content}
              </p>

              {testimonial.hasAudio && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 h-1 bg-primary/20 rounded-full">
                    <div className="w-1/3 h-full bg-primary rounded-full" />
                  </div>
                  <span className="text-xs text-muted-foreground">0:32</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

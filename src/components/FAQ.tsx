import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona o período de teste gratuito?",
      answer:
        "Você tem 3 dias completos para testar todas as funcionalidades do Planeja Bolso sem nenhum custo. Não é necessário cartão de crédito para começar. Se decidir não continuar, basta cancelar antes do fim do período.",
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais. O acesso continuará até o final do período pago.",
    },
    {
      question: "Como funciona a categorização automática?",
      answer:
        "Nossa inteligência artificial analisa suas transações e as categoriza automaticamente com base em padrões de gastos. Quanto mais você usa, mais preciso o sistema fica.",
    },
    {
      question: "Meus dados estão seguros?",
      answer:
        "Sim! Utilizamos criptografia de ponta a ponta através do WhatsApp e nossos servidores seguem os mais altos padrões de segurança. Seus dados financeiros nunca são compartilhados ou usados para outros fins.",
    },
    {
      question: "Posso usar o Planeja Bolso em família?",
      answer:
        "Sim! O Planeja Bolso é perfeito para controle familiar. Você pode mapear quem está gastando e ter uma visão completa das finanças de toda a família em um só lugar.",
    },
    {
      question: "Preciso instalar algum aplicativo?",
      answer:
        "Não! O Planeja Bolso funciona diretamente pelo WhatsApp, que você já tem instalado. Basta adicionar nosso número e começar a usar.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg px-6 border-2 hover:border-primary/20 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

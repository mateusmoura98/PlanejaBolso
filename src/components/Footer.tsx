import { Phone, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Copyright */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                PB
              </div>
              <span className="text-xl font-bold">Planeja Bolso</span>
            </div>
            <p className="text-sm text-background/70">
              © 2025 Planeja Bolso. Todos os direitos reservados.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </a>
              <a
                href="mailto:contato@planejabolso.com.br"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contato@planejabolso.com.br</span>
              </a>
              <a
                href="https://instagram.com/planejabolso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@planejabolso</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Úteis</h3>
            <div className="space-y-3 text-sm">
              <a
                href="#"
                className="block text-background/70 hover:text-background transition-colors"
              >
                Termos de Uso
              </a>
              <a
                href="#"
                className="block text-background/70 hover:text-background transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="block text-background/70 hover:text-background transition-colors"
              >
                Política de Cookies
              </a>
            </div>
          </div>
        </div>

        {/* Payment Security */}
        <div className="pt-8 border-t border-background/10 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-background/70">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <span>Pagamentos seguros via Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

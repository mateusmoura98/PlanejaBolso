import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '@/assets/planeja-bolso-logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"PT" | "EN">("PT");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* LOGO GRANDE */}
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Planeja Bolso" 
              className="h-24 w-auto object-contain" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("funcionalidades")} className="text-foreground hover:text-primary transition-colors font-medium">Funcionalidades</button>
            <button onClick={() => scrollToSection("como-funciona")} className="text-foreground hover:text-primary transition-colors font-medium">Como funciona</button>
            <button onClick={() => scrollToSection("planos")} className="text-foreground hover:text-primary transition-colors font-medium">Planos</button>
            <button onClick={() => scrollToSection("faq")} className="text-foreground hover:text-primary transition-colors font-medium">FAQ</button>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Acessar conta</Button>
            </Link>
            <button onClick={() => setLanguage(language === "PT" ? "EN" : "PT")} className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-foreground">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection("funcionalidades")} className="text-foreground hover:text-primary transition-colors font-medium text-left">Funcionalidades</button>
            <button onClick={() => scrollToSection("como-funciona")} className="text-foreground hover:text-primary transition-colors font-medium text-left">Como funciona</button>
            <button onClick={() => scrollToSection("planos")} className="text-foreground hover:text-primary transition-colors font-medium text-left">Planos</button>
            <button onClick={() => scrollToSection("faq")} className="text-foreground hover:text-primary transition-colors font-medium text-left">FAQ</button>
            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="justify-start">Acessar conta</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

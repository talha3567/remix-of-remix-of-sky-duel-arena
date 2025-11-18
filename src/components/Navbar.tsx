import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            <span className="text-primary">SMP</span>
            <span className="text-foreground">PRACTICE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Anasayfa
            </Link>
            <Link
              to="/features"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Özellikler
            </Link>
            <Link
              to="/kits"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Kitler
            </Link>
            <Link
              to="/arenas"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Arenalar
            </Link>
            <Link
              to="/stats"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              İstatistikler
            </Link>
            <Link
              to="/commands"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Komutlar
            </Link>
            <Link
              to="/staff"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Yetkililer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
            >
              Anasayfa
            </Link>
            <Link
              to="/features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
            >
              Özellikler
            </Link>
            <Link
              to="/kits"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
            >
              Kitler
            </Link>
            <Link
              to="/arenas"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
            >
              Arenalar
            </Link>
            <Link
              to="/stats"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
            >
              İstatistikler
            </Link>
            <Link
              to="/commands"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
            >
              Komutlar
            </Link>
            <Link
              to="/staff"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
            >
              Yetkililer
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setAvatarUrl(null);
      setUsername(null);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from("profiles")
      .select("avatar_url, username")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setAvatarUrl(data.avatar_url);
      setUsername(data.username);
    }
  };

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
              to="/stats"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              İstatistikler
            </Link>
            
            {user ? (
              <Link to="/profile">
                <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="w-8 h-8 border border-primary/50">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary text-sm">
                      {username?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-primary font-medium">{username || "Profil"}</span>
                </div>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <LogIn className="w-4 h-4 mr-2" />
                  Giriş Yap
                </Button>
              </Link>
            )}
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
              to="/stats"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
            >
              İstatistikler
            </Link>
            
            {user ? (
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
              >
                <Avatar className="w-6 h-6 border border-primary/50">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                    {username?.charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                {username || "Profil"}
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
              >
                <LogIn className="w-4 h-4 inline mr-2" />
                Giriş Yap
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

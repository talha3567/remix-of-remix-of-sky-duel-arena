import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { DiscordWidget } from "@/components/DiscordWidget";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarField />
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-2 text-lg">
            Türkiye'nin En İyi PVP Sunucusu
          </Badge>
          
          <h1 className="text-7xl md:text-8xl font-black tracking-tight">
            <span className="text-primary drop-shadow-[0_0_30px_rgba(135,206,235,0.5)]">
              SMP
            </span>
            <span className="text-foreground">PRACTICE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Türkiye'de olmayan özelliklerle dolu, profesyonel duel sistemi ve eşsiz arenalarla PVP deneyimini zirveye taşıyoruz.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <div className="bg-card border-2 border-primary/30 rounded-xl px-8 py-4 shadow-glow-cyan">
              <p className="text-sm text-muted-foreground mb-1">Sunucu IP</p>
              <p 
                className="text-2xl font-bold text-primary cursor-pointer hover:text-primary/80 transition-colors"
                onClick={() => copyToClipboard("smppractice.net")}
              >
                smppractice.net
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl px-6 py-4">
              <p className="text-sm text-muted-foreground mb-1">Sürüm</p>
              <p className="text-xl font-semibold">1.17 - 1.21.7</p>
            </div>
          </div>

          {/* Discord Widget */}
          <div className="max-w-md mx-auto mt-12">
            <DiscordWidget />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-border/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-4xl font-bold">
              <span className="text-primary">SMP</span>PRACTICE
            </h3>
            <p className="text-muted-foreground mt-2">Türkiye'nin En İyi PVP Sunucusu</p>
          </div>
          
          <div className="flex justify-center items-center gap-8 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Sunucu IP</p>
              <p className="text-lg font-semibold text-primary">smppractice.net</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sürüm</p>
              <p className="text-lg font-semibold">1.17 - 1.21.7</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2024 smppractice. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { Navbar } from "@/components/Navbar";
import { DiscordWidget } from "@/components/DiscordWidget";
import { ServerStatus } from "@/components/ServerStatus";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText("smpprac.net");
      setCopied(true);
      toast.success("IP adresi kopyalandı!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Kopyalama başarısız oldu");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12 fade-in">
          {/* Logo */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
              <span className="text-foreground">SMPPRAC</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-light">
              Türkiye'nin profesyonel Minecraft PVP sunucusu
            </p>
          </div>
          
          {/* Server IP - Minimal Style */}
          <div className="fade-in-delay-1">
            <button
              onClick={handleCopyIP}
              className="group glass-card hover-glow px-8 py-4 rounded-lg inline-flex items-center gap-3 transition-all"
            >
              <span className="text-2xl md:text-3xl font-mono font-semibold text-foreground tracking-wider">
                smpprac.net
              </span>
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </button>
            <p className="text-sm text-muted-foreground mt-3">Kopyalamak için tıkla</p>
          </div>

          {/* Server Status */}
          <div className="max-w-md mx-auto fade-in-delay-2">
            <ServerStatus serverAddress="smpprac.net" showCopyButton={false} />
          </div>

          {/* Discord Widget */}
          <div className="max-w-sm mx-auto fade-in-delay-3">
            <DiscordWidget />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">SMPPRAC</h3>
              <p className="text-muted-foreground text-sm mt-1">Minecraft PVP Sunucusu</p>
            </div>
            
            <div className="flex items-center gap-12 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Sunucu IP</p>
                <p className="font-semibold text-foreground">smpprac.net</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Sürüm</p>
                <p className="font-semibold text-foreground">1.17 - 1.21.7</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/20 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 SMPPRAC. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

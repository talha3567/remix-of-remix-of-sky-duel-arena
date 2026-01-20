import { Navbar } from "@/components/Navbar";
import { DiscordWidget } from "@/components/DiscordWidget";
import { ServerStatus } from "@/components/ServerStatus";
import { SnowAnimation } from "@/components/SnowAnimation";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Snow Animation Background */}
      <SnowAnimation />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-8 z-20">
              {/* Server Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  smpprac.net • Türkiye
                </span>
                <ServerStatus serverAddress="smpprac.net" showCopyButton={false} compact />
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                  Bir Sonraki<br />
                  <span className="text-primary">Practice Sunucun :D</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Türkiye Merkezli. Düellolar, FFA, Bot Practice ve Sandbox.
                </p>
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3">
                {["Türkiye • TR", "Düellolar & FFA", "Bot Practice", "Sandbox"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm glass-card rounded-lg text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleCopyIP}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all hover:scale-105"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Kopyalandı!
                  </>
                ) : (
                  <>
                    Oyna — IP Kopyala
                    <Copy className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Right - Hero Image Placeholder */}
            <div className="flex-1 relative z-20">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl" />
                <div className="relative glass-card rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">⚔️</div>
                    <p className="text-muted-foreground">PVP Practice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="relative z-20 px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Discord Card */}
          <div className="glass-card rounded-xl overflow-hidden hover-glow transition-all">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-red-400">Discord'a Katıl</h2>
                <p className="text-muted-foreground">
                  Güncellemeler, Oyuncularla Sohbet, Booster'lar Özel Avantajlar Açar!
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {["Topluluk", "Oyun İçi Sohbet", "Destek"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-sm border border-border/50 rounded-lg text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="https://discord.gg/smpprac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                >
                  Discord'a Katıl
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <div className="flex-1 min-h-[200px] bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center">
                <DiscordWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-16 px-6 border-t border-border/20">
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

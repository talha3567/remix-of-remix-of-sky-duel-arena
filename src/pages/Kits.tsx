import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sword, Axe, Sparkles, Flame, Zap } from "lucide-react";

const Kits = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarField />
      <Navbar />
      
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold mb-4">
              Savaş <span className="text-primary">Kitleri</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Her oyun tarzına uygun profesyonel kitlerle mücadele edin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Axe Kit */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Axe className="w-10 h-10 text-primary" />
                  <CardTitle className="text-3xl">Axe Kit</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Güçlü balta saldırıları ve uzun menzilli savaş için ideal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Elmas Balta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Elmas Kılıç</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">5 Ok + Arbalet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Full Elmas Zırh</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Kalkan</span>
                </div>
              </CardContent>
            </Card>

            {/* Sword Kit */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Sword className="w-10 h-10 text-primary" />
                  <CardTitle className="text-3xl">Sword Kit</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Klasik kılıç ustası combo'ları için mükemmel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Elmas Kılıç</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Full Elmas Zırh</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Saf PVP Deneyimi</span>
                </div>
              </CardContent>
            </Card>

            {/* Crystal Kit */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-10 h-10 text-primary" />
                  <CardTitle className="text-3xl">Crystal Kit</CardTitle>
                </div>
                <CardDescription className="text-base">
                  End kristalleri ile taktiksel savaş stratejisi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Elmas Kılıç</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">16 End Kristali</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Full Netherite Zırh</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Golden Apple x16</span>
                </div>
              </CardContent>
            </Card>

            {/* UHC Kit */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="w-10 h-10 text-primary" />
                  <CardTitle className="text-3xl">UHC Kit</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Ultra Hardcore modu için hayatta kalma kiti
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Elmas Kılıç (Sharpness II)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Yay + 64 Ok</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Full Elmas Zırh (Protection II)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Golden Apple x8</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Lava Bucket</span>
                </div>
              </CardContent>
            </Card>

            {/* Speed Kit */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-10 h-10 text-primary" />
                  <CardTitle className="text-3xl">Speed Kit</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Hız potları ile hızlı tempolu agresif oyun
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Elmas Kılıç</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Full Elmas Zırh</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Speed II Potion x3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Strength Potion x2</span>
                </div>
              </CardContent>
            </Card>

            {/* Archer Kit */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Sword className="w-10 h-10 text-primary rotate-45" />
                  <CardTitle className="text-3xl">Archer Kit</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Uzun menzil savaş ustası kiti
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Power V Bow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">64 Ok</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Elmas Kılıç</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Full Zincirli Zırh</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kits;

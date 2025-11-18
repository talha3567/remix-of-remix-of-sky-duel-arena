import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Crosshair, Sword, Globe } from "lucide-react";

const Features = () => {
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
              <span className="text-primary">Benzersiz</span> Özellikler
            </h1>
            <p className="text-xl text-muted-foreground">
              Türkiye'de görmediğiniz sistemlerle donatılmış profesyonel bir PVP deneyimi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card border-primary/20 hover:border-primary/50 transition-all hover:shadow-glow-cyan group">
              <CardHeader>
                <Crosshair className="w-12 h-12 text-primary mb-4 group-hover:animate-float" />
                <CardTitle className="text-2xl">Queue Sistemi</CardTitle>
                <CardDescription className="text-base">
                  /queue komutuyla anında eşleşme bulun ve savaşa atılın. Gelişmiş matchmaking algoritması ile size uygun rakipler bulur.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-primary/20 hover:border-primary/50 transition-all hover:shadow-glow-cyan group">
              <CardHeader>
                <Sword className="w-12 h-12 text-primary mb-4 group-hover:animate-float" />
                <CardTitle className="text-2xl">Duel Modu</CardTitle>
                <CardDescription className="text-base">
                  /duel komutuyla istediğiniz oyuncuya meydan okuyun. Arkadaşlarınızla özel maçlar yapın ve yeteneklerinizi test edin.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-primary/20 hover:border-primary/50 transition-all hover:shadow-glow-cyan group">
              <CardHeader>
                <Globe className="w-12 h-12 text-primary mb-4 group-hover:animate-float" />
                <CardTitle className="text-2xl">Özel Arenalar</CardTitle>
                <CardDescription className="text-base">
                  Çöl, Kuzey Kutbu, Nether ve End gibi benzersiz arenalarda savaşın. Her arena farklı bir deneyim sunar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

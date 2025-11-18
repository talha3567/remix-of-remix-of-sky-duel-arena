import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Swords, Trophy, Crown } from "lucide-react";

const Stats = () => {
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
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h1 className="text-6xl font-bold mb-4">
              Canlı <span className="text-primary">İstatistikler</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Sunucumuzun anlık verileri ve en iyi oyuncular
            </p>
          </div>

          {/* Live Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-5xl font-bold text-primary mb-2 animate-glow-pulse">1,247</h3>
                <p className="text-xl text-muted-foreground">Toplam Oyuncu</p>
                <p className="text-sm text-foreground/60 mt-2">Kayıtlı üye sayısı</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardContent className="p-8 text-center">
                <Swords className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-5xl font-bold text-primary mb-2 animate-glow-pulse">34</h3>
                <p className="text-xl text-muted-foreground">Aktif Düellolar</p>
                <p className="text-sm text-foreground/60 mt-2">Şu anda devam eden savaşlar</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
              <CardContent className="p-8 text-center">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-5xl font-bold text-primary mb-2 animate-glow-pulse">892</h3>
                <p className="text-xl text-muted-foreground">Günlük Kazananlar</p>
                <p className="text-sm text-foreground/60 mt-2">Bugün kazanan oyuncu sayısı</p>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-primary/30">
              <CardHeader className="text-center pb-8">
                <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-4xl font-bold">
                  <span className="text-primary">Lider</span> Tablosu
                </CardTitle>
                <CardDescription className="text-lg">
                  En iyi PVP savaşçıları
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Top 1 */}
                <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 flex items-center justify-between hover:shadow-glow-cyan transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">1</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-primary">xPro_Gamer47</h4>
                      <p className="text-muted-foreground">Master Savaşçı</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">2,847</p>
                    <p className="text-sm text-muted-foreground">Kazanma</p>
                  </div>
                </div>

                {/* Top 2 */}
                <div className="bg-secondary/50 border border-border rounded-xl p-6 flex items-center justify-between hover:bg-secondary transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-gray/20 border-2 border-neutral-gray flex items-center justify-center">
                      <span className="text-2xl font-bold text-foreground">2</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Shadow_Warrior</h4>
                      <p className="text-muted-foreground">Elite Oyuncu</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">2,156</p>
                    <p className="text-sm text-muted-foreground">Kazanma</p>
                  </div>
                </div>

                {/* Top 3 */}
                <div className="bg-secondary/50 border border-border rounded-xl p-6 flex items-center justify-between hover:bg-secondary transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-900/30 border-2 border-amber-700 flex items-center justify-center">
                      <span className="text-2xl font-bold text-foreground">3</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">KralKiller</h4>
                      <p className="text-muted-foreground">Pro Oyuncu</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">1,924</p>
                    <p className="text-sm text-muted-foreground">Kazanma</p>
                  </div>
                </div>

                {/* Top 4-5 */}
                <div className="bg-card/50 border border-border/50 rounded-xl p-4 flex items-center justify-between hover:bg-card transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-semibold text-muted-foreground w-8">4</span>
                    <h4 className="text-lg font-semibold">TurboFighter</h4>
                  </div>
                  <p className="text-lg font-bold text-foreground">1,678</p>
                </div>

                <div className="bg-card/50 border border-border/50 rounded-xl p-4 flex items-center justify-between hover:bg-card transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-semibold text-muted-foreground w-8">5</span>
                    <h4 className="text-lg font-semibold">Lightning_PvP</h4>
                  </div>
                  <p className="text-lg font-bold text-foreground">1,543</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stats;

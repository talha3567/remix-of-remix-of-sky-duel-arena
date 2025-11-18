import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal } from "lucide-react";

const Commands = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarField />
      <Navbar />
      
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="text-center mb-16 animate-fade-in">
            <Terminal className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-primary">Komutlar</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Basit ve etkili komutlarla oyunu yönetin
            </p>
          </div>

          <div className="space-y-4">
            <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <code className="text-2xl font-mono text-primary">/queue</code>
                    <p className="text-muted-foreground mt-2">Otomatik eşleşme kuyruğuna katıl</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <code className="text-2xl font-mono text-primary">/duel [oyuncu]</code>
                    <p className="text-muted-foreground mt-2">Belirli bir oyuncuya düello isteği gönder</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Commands;

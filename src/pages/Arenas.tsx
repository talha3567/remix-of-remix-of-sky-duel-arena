import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import arenaDesert from "@/assets/arena-desert.jpg";
import arenaIce from "@/assets/arena-ice.jpg";
import arenaNether from "@/assets/arena-nether.jpg";
import arenaEnd from "@/assets/arena-end.jpg";

const Arenas = () => {
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
            <Globe className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
            <h1 className="text-6xl font-bold mb-4">
              Savaş <span className="text-primary">Arenaları</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Benzersiz ve etkileyici arenalarda PVP yeteneklerinizi test edin
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Desert Arena */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={arenaDesert} 
                  alt="Çöl Arenası" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl text-primary">Çöl Arenası</CardTitle>
                <CardDescription className="text-base">
                  Kumların arasında stratejik savaş. Antik harabelerin gölgesinde rakiplerinizi alt edin. Geniş açık alanlar hızlı manevralar için ideal.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Ice Arena */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={arenaIce} 
                  alt="Kuzey Kutbu Arenası" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl text-primary">Kuzey Kutbu</CardTitle>
                <CardDescription className="text-base">
                  Buzulların üzerinde soğuk kanlılığınızı koruyun. Kuzey ışıklarının altında epik düellolar. Kaygan zeminler taktik gerektiriyor.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Nether Arena */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={arenaNether} 
                  alt="Nether Arenası" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl text-primary">Nether Arenası</CardTitle>
                <CardDescription className="text-base">
                  Lav gölleri ve netherrack platformları üzerinde tehlikeli savaşlar. Ateş ve kükürt kokulu bu arenada sadece en cesurlar hayatta kalır.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* End Arena */}
            <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={arenaEnd} 
                  alt="End Arenası" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl text-primary">End Dimension</CardTitle>
                <CardDescription className="text-base">
                  Void'in üzerinde yüzen adalarda son savaş. Mor ışıltılar ve sonsuzluğun kenarında düellolar. Düşmemek en büyük öncelik.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Arenas;

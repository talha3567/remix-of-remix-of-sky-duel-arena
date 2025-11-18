import { StarField } from "@/components/StarField";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield } from "lucide-react";

const Staff = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarField />
      <Navbar />
      
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="text-center mb-16 animate-fade-in">
            <Users className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-primary">Yetkili</span> Ekibimiz
            </h1>
            <p className="text-xl text-muted-foreground">
              Profesyonel ve deneyimli ekibimiz her zaman yanınızda
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-center">
                <Shield className="inline w-8 h-8 mr-2 text-admin-red" />
                <span className="text-admin-red">Adminler</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="bg-gradient-card border-admin-red/30 hover:border-admin-red/60 transition-all hover:shadow-[0_0_30px_rgba(139,0,0,0.3)]">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-admin-red/20 border-2 border-admin-red mx-auto mb-4 flex items-center justify-center">
                      <Shield className="w-10 h-10 text-admin-red" />
                    </div>
                    <h4 className="text-2xl font-bold text-admin-red mb-2">Curseebabuss</h4>
                    <Badge className="bg-admin-red/20 text-admin-red border-admin-red/30">Admin</Badge>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-admin-red/30 hover:border-admin-red/60 transition-all hover:shadow-[0_0_30px_rgba(139,0,0,0.3)]">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-admin-red/20 border-2 border-admin-red mx-auto mb-4 flex items-center justify-center">
                      <Shield className="w-10 h-10 text-admin-red" />
                    </div>
                    <h4 className="text-2xl font-bold text-admin-red mb-2">dalha3567</h4>
                    <Badge className="bg-admin-red/20 text-admin-red border-admin-red/30">Admin</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6 text-center">
                <Users className="inline w-8 h-8 mr-2 text-moderator-cyan" />
                <span className="text-moderator-cyan">Moderatörler</span>
              </h3>
              <div className="max-w-md mx-auto">
                <Card className="bg-gradient-card border-moderator-cyan/30 hover:border-moderator-cyan/60 transition-all hover:shadow-glow-cyan">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-moderator-cyan/20 border-2 border-moderator-cyan mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-moderator-cyan" />
                    </div>
                    <h4 className="text-2xl font-bold text-moderator-cyan mb-2">tolga</h4>
                    <Badge className="bg-moderator-cyan/20 text-moderator-cyan border-moderator-cyan/30">Moderatör</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Radio } from "lucide-react";

export const DiscordWidget = () => {
  return (
    <Card className="bg-gradient-card border-primary/30 hover:shadow-glow-cyan transition-all">
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">
          <span className="text-primary">Discord</span> Topluluğumuz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-primary">3,284</p>
            <p className="text-sm text-muted-foreground">Toplam Üye</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <Radio className="w-8 h-8 text-green-500 mx-auto mb-2 animate-pulse" />
            <p className="text-3xl font-bold text-green-500">247</p>
            <p className="text-sm text-muted-foreground">Çevrimiçi</p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Discord sunucumuza katılarak topluluğumuzun bir parçası olun! Etkinlikler, duyurular ve daha fazlası için bize katılın.
          </p>
          <Button 
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-lg py-6"
            onClick={() => window.open("https://discord.gg/smppractice", "_blank")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Discord'a Katıl
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

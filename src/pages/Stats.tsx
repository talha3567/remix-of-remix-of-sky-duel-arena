import { useState, useEffect } from "react";
import { StarField } from "@/components/StarField";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Users, Swords, Trophy, Crown, Loader2 } from "lucide-react";

interface LeaderboardPlayer {
  username: string | null;
  avatar_url: string | null;
  total_wins: number;
  total_kills: number;
}

const Stats = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPlayers: 0,
    activeDuels: 34,
    dailyWins: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: players, error } = await supabase
      .from("profiles")
      .select("username, avatar_url, total_wins, total_kills")
      .order("total_wins", { ascending: false })
      .limit(10);

    if (!error && players) {
      setLeaderboard(players);
      setStats({
        totalPlayers: players.length,
        activeDuels: 34,
        dailyWins: players.reduce((acc, p) => acc + p.total_wins, 0)
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarField />
      <BackButton />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-center mb-4">
          Canlı <span className="text-primary">İstatistikler</span>
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          Sunucu istatistikleri ve liderlik tablosu
        </p>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card/80 backdrop-blur-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <Users className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-4xl font-bold text-foreground">{stats.totalPlayers}</p>
              <p className="text-muted-foreground">Toplam Oyuncu</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <Swords className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <p className="text-4xl font-bold text-foreground">{stats.activeDuels}</p>
              <p className="text-muted-foreground">Aktif Düello</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-lg border-border/50 text-center">
            <CardContent className="pt-6">
              <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
              <p className="text-4xl font-bold text-foreground">{stats.dailyWins}</p>
              <p className="text-muted-foreground">Toplam Galibiyet</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="bg-card/80 backdrop-blur-lg border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Crown className="w-6 h-6" />
              Lider Tablosu
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : leaderboard.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Henüz oyuncu bulunmuyor. İlk sen ol!
              </p>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                      index === 0 
                        ? "bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30" 
                        : index === 1 
                        ? "bg-gradient-to-r from-gray-400/20 to-gray-400/5 border border-gray-400/30"
                        : index === 2
                        ? "bg-gradient-to-r from-amber-600/20 to-amber-600/5 border border-amber-600/30"
                        : "bg-background/50 border border-border/30"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? "bg-yellow-500 text-black" :
                      index === 1 ? "bg-gray-400 text-black" :
                      index === 2 ? "bg-amber-600 text-white" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {index + 1}
                    </div>
                    
                    <Avatar className="w-10 h-10 border border-border/50">
                      <AvatarImage src={player.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {player.username?.charAt(0).toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{player.username || "İsimsiz Oyuncu"}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{player.total_wins} Galibiyet</p>
                      <p className="text-sm text-muted-foreground">{player.total_kills} Öldürme</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stats;

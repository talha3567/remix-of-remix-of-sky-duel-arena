import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Search, User, Trophy, Skull, Swords, Target, Flame, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Profile {
  id: string;
  user_id: string;
  username: string | null;
  avatar_url: string | null;
  total_kills: number;
  total_deaths: number;
  total_wins: number;
  total_duels: number;
  win_streak: number;
  best_win_streak: number;
}

const PlayerCard = ({ player }: { player: Profile }) => {
  const kd = player.total_deaths > 0 
    ? (player.total_kills / player.total_deaths).toFixed(2) 
    : player.total_kills.toFixed(2);
  const winRate = player.total_duels > 0 
    ? Math.round((player.total_wins / player.total_duels) * 100) 
    : 0;

  return (
    <Link
      to={`/players/${player.user_id}`}
      className="block bg-card/50 border border-border/50 rounded-xl p-4 hover:border-primary/50 hover:bg-card/70 transition-all group"
    >
      <div className="flex items-center gap-4">
        <Avatar className="w-14 h-14 border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
          <AvatarImage src={player.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/20 text-primary text-lg">
            {player.username?.charAt(0).toUpperCase() || <User className="w-6 h-6" />}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-lg truncate group-hover:text-primary transition-colors">
            {player.username || "Bilinmeyen Oyuncu"}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              {player.total_wins}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4 text-primary" />
              {kd} K/D
            </span>
            <span className="flex items-center gap-1">
              <Swords className="w-4 h-4 text-muted-foreground" />
              {player.total_duels}
            </span>
          </div>
        </div>

        <div className="text-right">
          <Badge 
            variant="outline" 
            className={`${
              winRate >= 60 
                ? "bg-green-500/20 text-green-400 border-green-500/40" 
                : winRate >= 40 
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                  : "bg-red-500/20 text-red-400 border-red-500/40"
            }`}
          >
            %{winRate} WR
          </Badge>
          {player.win_streak >= 3 && (
            <div className="flex items-center gap-1 text-orange-400 text-sm mt-1 justify-end">
              <Flame className="w-4 h-4" />
              {player.win_streak} streak
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const PlayerProfile = ({ userId }: { userId: string }) => {
  const [player, setPlayer] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) console.error("Error fetching player:", error);
      setPlayer(data);
      setLoading(false);
    };

    fetchPlayer();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-64 bg-card/50 rounded-xl animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center py-16">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Oyuncu Bulunamadı</h2>
            <p className="text-muted-foreground">Bu oyuncu mevcut değil veya silinmiş olabilir.</p>
            <Link to="/players" className="text-primary hover:underline mt-4 inline-block">
              ← Oyunculara dön
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const kd = player.total_deaths > 0 
    ? (player.total_kills / player.total_deaths).toFixed(2) 
    : player.total_kills.toFixed(2);
  const winRate = player.total_duels > 0 
    ? Math.round((player.total_wins / player.total_duels) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link to="/players" className="text-primary hover:underline mb-6 inline-block">
            ← Tüm Oyuncular
          </Link>

          {/* Profile Header */}
          <div className="bg-card/50 border border-border/50 rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/50">
                <AvatarImage src={player.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/20 text-primary text-3xl">
                  {player.username?.charAt(0).toUpperCase() || <User className="w-12 h-12" />}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {player.username || "Bilinmeyen Oyuncu"}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  {player.best_win_streak >= 5 && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                      <Crown className="w-4 h-4 mr-1" />
                      Şampiyon
                    </Badge>
                  )}
                  {player.win_streak >= 3 && (
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40">
                      <Flame className="w-4 h-4 mr-1" />
                      {player.win_streak} Seri
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{player.total_wins}</p>
              <p className="text-sm text-muted-foreground">Galibiyetler</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{player.total_kills}</p>
              <p className="text-sm text-muted-foreground">Kills</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
              <Skull className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{player.total_deaths}</p>
              <p className="text-sm text-muted-foreground">Deaths</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
              <Swords className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{player.total_duels}</p>
              <p className="text-sm text-muted-foreground">Düellolar</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card/50 border border-border/50 rounded-xl p-6">
              <p className="text-muted-foreground mb-1">K/D Oranı</p>
              <p className="text-3xl font-bold text-primary">{kd}</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-xl p-6">
              <p className="text-muted-foreground mb-1">Kazanma Oranı</p>
              <p className="text-3xl font-bold text-primary">%{winRate}</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-xl p-6">
              <p className="text-muted-foreground mb-1">En İyi Seri</p>
              <p className="text-3xl font-bold text-primary">{player.best_win_streak}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Players = () => {
  const { userId } = useParams();
  const [players, setPlayers] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      fetchPlayers();
    }
  }, [userId]);

  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("total_wins", { ascending: false });

    if (error) console.error("Error fetching players:", error);
    setPlayers(data || []);
    setLoading(false);
  };

  // If userId is present, show player profile
  if (userId) {
    return <PlayerProfile userId={userId} />;
  }

  const filteredPlayers = players.filter(player =>
    player.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Oyuncu <span className="text-primary">Arama</span>
            </h1>
            <p className="text-muted-foreground">
              Diğer oyuncuların profillerini ve istatistiklerini görüntüleyin
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Oyuncu ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Players List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-card/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredPlayers.length === 0 ? (
            <div className="text-center py-16 bg-card/30 rounded-xl border border-border/50">
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchQuery ? "Oyuncu bulunamadı" : "Henüz kayıtlı oyuncu yok"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Farklı bir arama terimi deneyin"
                  : "İlk düellonuzu yapmak için sunucuya bağlanın"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Players;

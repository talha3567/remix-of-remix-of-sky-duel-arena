import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Search, User, Trophy, Skull, Swords, Target, Flame, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MinecraftAvatar } from "@/components/MinecraftAvatar";

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

const PlayerCard = ({ player, index }: { player: Profile; index: number }) => {
  const kd = player.total_deaths > 0 
    ? (player.total_kills / player.total_deaths).toFixed(2) 
    : player.total_kills.toFixed(2);
  const winRate = player.total_duels > 0 
    ? Math.round((player.total_wins / player.total_duels) * 100) 
    : 0;

  return (
    <Link
      to={`/players/${player.user_id}`}
      className="block glass-card rounded-lg p-4 hover-glow group fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-4">
        <MinecraftAvatar 
          username={player.username} 
          size="lg" 
          className="group-hover:scale-105 transition-transform"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-foreground/80 transition-colors">
            {player.username || "Bilinmeyen Oyuncu"}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {player.total_wins}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {kd} K/D
            </span>
            <span className="flex items-center gap-1">
              <Swords className="w-3 h-3" />
              {player.total_duels}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-sm font-medium ${
            winRate >= 60 ? "text-green-500" : winRate >= 40 ? "text-yellow-500" : "text-red-500"
          }`}>
            %{winRate}
          </span>
          {player.win_streak >= 3 && (
            <div className="flex items-center gap-1 text-orange-500 text-xs mt-1 justify-end">
              <Flame className="w-3 h-3" />
              {player.win_streak}
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
            <div className="h-64 glass-card rounded-lg animate-pulse" />
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
          <div className="max-w-4xl mx-auto text-center py-20 fade-in">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Oyuncu Bulunamadı</h2>
            <p className="text-muted-foreground text-sm mb-6">Bu oyuncu mevcut değil veya silinmiş olabilir.</p>
            <Link to="/players" className="text-foreground hover:text-muted-foreground transition-colors text-sm">
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
          <Link to="/players" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8 fade-in">
            <ArrowLeft className="w-4 h-4" />
            Tüm Oyuncular
          </Link>

          {/* Profile Header */}
          <div className="glass-card rounded-lg p-8 mb-8 fade-in">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <MinecraftAvatar 
                username={player.username} 
                size="xl" 
                className="border-2 border-border/50"
              />
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {player.username || "Bilinmeyen Oyuncu"}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  {player.best_win_streak >= 5 && (
                    <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                      Şampiyon
                    </span>
                  )}
                  {player.win_streak >= 3 && (
                    <span className="text-xs text-orange-500 bg-orange-500/10 px-2 py-1 rounded flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {player.win_streak} Seri
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card rounded-lg p-4 text-center fade-in-delay-1">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{player.total_wins}</p>
              <p className="text-xs text-muted-foreground">Galibiyetler</p>
            </div>
            
            <div className="glass-card rounded-lg p-4 text-center fade-in-delay-1">
              <Target className="w-6 h-6 text-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{player.total_kills}</p>
              <p className="text-xs text-muted-foreground">Kills</p>
            </div>
            
            <div className="glass-card rounded-lg p-4 text-center fade-in-delay-2">
              <Skull className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{player.total_deaths}</p>
              <p className="text-xs text-muted-foreground">Deaths</p>
            </div>
            
            <div className="glass-card rounded-lg p-4 text-center fade-in-delay-2">
              <Swords className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{player.total_duels}</p>
              <p className="text-xs text-muted-foreground">Düellolar</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in-delay-3">
            <div className="glass-card rounded-lg p-5">
              <p className="text-muted-foreground text-sm mb-1">K/D Oranı</p>
              <p className="text-3xl font-bold text-foreground">{kd}</p>
            </div>
            
            <div className="glass-card rounded-lg p-5">
              <p className="text-muted-foreground text-sm mb-1">Kazanma Oranı</p>
              <p className="text-3xl font-bold text-foreground">%{winRate}</p>
            </div>
            
            <div className="glass-card rounded-lg p-5">
              <p className="text-muted-foreground text-sm mb-1">En İyi Seri</p>
              <p className="text-3xl font-bold text-foreground">{player.best_win_streak}</p>
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
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Oyuncular
            </h1>
            <p className="text-muted-foreground">
              Diğer oyuncuların profillerini görüntüleyin
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-8 fade-in-delay-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Oyuncu ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 glass-card border-border/20 text-foreground placeholder:text-muted-foreground focus:border-border/40"
            />
          </div>

          {/* Players List */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 glass-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredPlayers.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-lg fade-in">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? "Oyuncu bulunamadı" : "Henüz kayıtlı oyuncu yok"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {searchQuery 
                  ? "Farklı bir arama terimi deneyin"
                  : "İlk düellonuzu yapmak için sunucuya bağlanın"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPlayers.map((player, index) => (
                <PlayerCard key={player.id} player={player} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Players;

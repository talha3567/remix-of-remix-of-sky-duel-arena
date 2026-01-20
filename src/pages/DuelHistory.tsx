import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Swords, Trophy, Clock, MapPin } from "lucide-react";
import { MinecraftAvatar } from "@/components/MinecraftAvatar";

interface DuelWithProfiles {
  id: string;
  player1_id: string;
  player2_id: string;
  winner_id: string | null;
  player1_kills: number;
  player2_kills: number;
  arena: string | null;
  duration_seconds: number | null;
  created_at: string;
  player1_profile?: {
    username: string | null;
    avatar_url: string | null;
  };
  player2_profile?: {
    username: string | null;
    avatar_url: string | null;
  };
}

const DuelHistory = () => {
  const [duels, setDuels] = useState<DuelWithProfiles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDuels();

    const channel = supabase
      .channel('duels-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'duels' },
        () => fetchDuels()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDuels = async () => {
    const { data: duelsData, error } = await supabase
      .from("duels")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching duels:", error);
      setLoading(false);
      return;
    }

    if (!duelsData) {
      setLoading(false);
      return;
    }

    const playerIds = [...new Set(duelsData.flatMap(d => [d.player1_id, d.player2_id]))];
    
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, username, avatar_url")
      .in("user_id", playerIds);

    const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

    const duelsWithProfiles: DuelWithProfiles[] = duelsData.map(duel => ({
      ...duel,
      player1_profile: profileMap.get(duel.player1_id),
      player2_profile: profileMap.get(duel.player2_id),
    }));

    setDuels(duelsWithProfiles);
    setLoading(false);
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const PlayerCard = ({ 
    profile, 
    kills, 
    isWinner,
    playerId 
  }: { 
    profile?: { username: string | null; avatar_url: string | null }; 
    kills: number;
    isWinner: boolean;
    playerId: string;
  }) => (
    <Link 
      to={`/players/${playerId}`}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all hover-glow ${
        isWinner 
          ? "glass-card border border-green-500/20" 
          : "glass-card"
      }`}
    >
      <MinecraftAvatar username={profile?.username || null} size="md" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">
          {profile?.username || "Bilinmeyen Oyuncu"}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{kills} kill</span>
          {isWinner && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              Kazandı
            </span>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Düellolar
            </h1>
            <p className="text-muted-foreground">
              Son düellolar ve sonuçları
            </p>
          </div>

          {/* Duels List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 glass-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : duels.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-lg fade-in">
              <Swords className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Henüz düello yok</h3>
              <p className="text-muted-foreground text-sm">
                Sunucuya bağlanarak düello yapabilirsiniz
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {duels.map((duel, index) => (
                <div
                  key={duel.id}
                  className={`glass-card rounded-lg p-5 hover-glow fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Match Info */}
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {duel.arena && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {duel.arena}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(duel.duration_seconds)}
                      </span>
                    </div>
                    <span className="text-xs">{formatDate(duel.created_at)}</span>
                  </div>

                  {/* Players */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <PlayerCard
                      profile={duel.player1_profile}
                      kills={duel.player1_kills}
                      isWinner={duel.winner_id === duel.player1_id}
                      playerId={duel.player1_id}
                    />
                    
                    <div className="hidden md:flex flex-col items-center">
                      <span className="text-xl font-bold text-muted-foreground">VS</span>
                      <span className="text-2xl font-bold mt-1">
                        <span className={duel.winner_id === duel.player1_id ? "text-foreground" : "text-muted-foreground"}>
                          {duel.player1_kills}
                        </span>
                        <span className="text-muted-foreground mx-2">-</span>
                        <span className={duel.winner_id === duel.player2_id ? "text-foreground" : "text-muted-foreground"}>
                          {duel.player2_kills}
                        </span>
                      </span>
                    </div>
                    
                    <PlayerCard
                      profile={duel.player2_profile}
                      kills={duel.player2_kills}
                      isWinner={duel.winner_id === duel.player2_id}
                      playerId={duel.player2_id}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DuelHistory;

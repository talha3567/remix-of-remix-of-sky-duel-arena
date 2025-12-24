import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Swords, Trophy, Skull, Clock, MapPin, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

    // Subscribe to realtime updates
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

    // Fetch profiles for all unique player IDs
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
      className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-105 ${
        isWinner 
          ? "bg-primary/20 border border-primary/40" 
          : "bg-secondary/50 border border-border/50"
      }`}
    >
      <Avatar className="w-10 h-10 border-2 border-primary/30">
        <AvatarImage src={profile?.avatar_url || undefined} />
        <AvatarFallback className="bg-primary/20 text-primary">
          {profile?.username?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate">
          {profile?.username || "Bilinmeyen Oyuncu"}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{kills} kill</span>
          {isWinner && (
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40 text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              Kazandı
            </Badge>
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Swords className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Düello <span className="text-primary">Geçmişi</span>
            </h1>
            <p className="text-muted-foreground">
              Son düellolar ve sonuçları
            </p>
          </div>

          {/* Duels List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-card/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : duels.length === 0 ? (
            <div className="text-center py-16 bg-card/30 rounded-xl border border-border/50">
              <Swords className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Henüz düello yok</h3>
              <p className="text-muted-foreground">
                Sunucuya bağlanarak düello yapabilirsiniz
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {duels.map((duel) => (
                <div
                  key={duel.id}
                  className="bg-card/50 border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-all"
                >
                  {/* Match Info */}
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {duel.arena && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {duel.arena}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDuration(duel.duration_seconds)}
                      </span>
                    </div>
                    <span>{formatDate(duel.created_at)}</span>
                  </div>

                  {/* Players */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PlayerCard
                      profile={duel.player1_profile}
                      kills={duel.player1_kills}
                      isWinner={duel.winner_id === duel.player1_id}
                      playerId={duel.player1_id}
                    />
                    
                    <div className="hidden md:flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">VS</span>
                    </div>
                    
                    <PlayerCard
                      profile={duel.player2_profile}
                      kills={duel.player2_kills}
                      isWinner={duel.winner_id === duel.player2_id}
                      playerId={duel.player2_id}
                    />
                  </div>

                  {/* Score */}
                  <div className="mt-4 flex items-center justify-center gap-4 text-2xl font-bold">
                    <span className={duel.winner_id === duel.player1_id ? "text-primary" : "text-muted-foreground"}>
                      {duel.player1_kills}
                    </span>
                    <span className="text-muted-foreground">-</span>
                    <span className={duel.winner_id === duel.player2_id ? "text-primary" : "text-muted-foreground"}>
                      {duel.player2_kills}
                    </span>
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

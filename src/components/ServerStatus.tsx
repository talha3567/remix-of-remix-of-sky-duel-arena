import { useEffect, useState } from "react";
import { Server, Users, Wifi, WifiOff, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ServerData {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  version: string;
  motd: string;
}

interface ServerStatusProps {
  serverAddress: string;
  showCopyButton?: boolean;
}

export const ServerStatus = ({ serverAddress, showCopyButton = true }: ServerStatusProps) => {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchServerStatus();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchServerStatus, 60000);
    return () => clearInterval(interval);
  }, [serverAddress]);

  const fetchServerStatus = async () => {
    try {
      // Using mcstatus.io API for Minecraft server status
      const response = await fetch(
        `https://api.mcstatus.io/v2/status/java/${serverAddress}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setServerData({
          online: data.online,
          players: {
            online: data.players?.online || 0,
            max: data.players?.max || 0,
          },
          version: data.version?.name_clean || "Unknown",
          motd: data.motd?.clean || "",
        });
      } else {
        setServerData(null);
      }
    } catch (error) {
      console.error("Error fetching server status:", error);
      setServerData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(serverAddress);
      setCopied(true);
      toast.success("IP adresi kopyalandı!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Kopyalama başarısız oldu");
    }
  };

  if (loading) {
    return (
      <div className="bg-card/50 border border-border/50 rounded-xl p-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-muted rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const isOnline = serverData?.online;

  return (
    <div className={`bg-card/50 border rounded-xl p-6 transition-all ${
      isOnline ? "border-green-500/50" : "border-red-500/50"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${
            isOnline ? "bg-green-500/20" : "bg-red-500/20"
          }`}>
            <Server className={`w-6 h-6 ${
              isOnline ? "text-green-500" : "text-red-500"
            }`} />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">{serverAddress}</h3>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                  <Wifi className="w-3 h-3 mr-1" />
                  Çevrimiçi
                </Badge>
              ) : (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/40">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Çevrimdışı
                </Badge>
              )}
              {serverData?.version && (
                <span className="text-sm text-muted-foreground">
                  {serverData.version}
                </span>
              )}
            </div>
          </div>
        </div>

        {showCopyButton && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyIP}
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? "Kopyalandı" : "IP Kopyala"}
          </Button>
        )}
      </div>

      {isOnline && serverData && (
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Oyuncular</p>
              <p className="font-bold text-foreground">
                {serverData.players.online} / {serverData.players.max}
              </p>
            </div>
          </div>
          
          {serverData.motd && (
            <div>
              <p className="text-sm text-muted-foreground">MOTD</p>
              <p className="text-foreground text-sm truncate">{serverData.motd}</p>
            </div>
          )}
        </div>
      )}

      {!isOnline && (
        <p className="text-muted-foreground text-sm mt-4 pt-4 border-t border-border/50">
          Sunucu şu anda çevrimdışı veya erişilemiyor durumda.
        </p>
      )}
    </div>
  );
};

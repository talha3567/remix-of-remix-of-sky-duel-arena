import { useEffect, useState } from "react";
import { Server, Users, Wifi, WifiOff, Copy, Check } from "lucide-react";
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
  compact?: boolean;
}

export const ServerStatus = ({ serverAddress, showCopyButton = true, compact = false }: ServerStatusProps) => {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchServerStatus();
    
    const interval = setInterval(fetchServerStatus, 60000);
    return () => clearInterval(interval);
  }, [serverAddress]);

  const fetchServerStatus = async () => {
    try {
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
      <div className="glass-card rounded-lg p-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-secondary rounded w-1/3" />
            <div className="h-2 bg-secondary rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const isOnline = serverData?.online;

  // Compact mode - just show player count inline
  if (compact) {
    return (
      <span className="text-sm text-muted-foreground">
        {isOnline && serverData ? `• ${serverData.players.online} çevrimiçi` : ""}
      </span>
    );
  }

  return (
    <div className="glass-card rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            isOnline ? "bg-green-500/10" : "bg-red-500/10"
          }`}>
            <Server className={`w-5 h-5 ${
              isOnline ? "text-green-500" : "text-red-500"
            }`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <span className="flex items-center gap-1 text-green-500 text-sm font-medium">
                  <Wifi className="w-3 h-3" />
                  Çevrimiçi
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 text-sm font-medium">
                  <WifiOff className="w-3 h-3" />
                  Çevrimdışı
                </span>
              )}
              {isOnline && serverData && (
                <span className="text-muted-foreground text-sm">
                  • {serverData.players.online}/{serverData.players.max} oyuncu
                </span>
              )}
            </div>
            {serverData?.version && (
              <span className="text-xs text-muted-foreground">
                {serverData.version}
              </span>
            )}
          </div>
        </div>

        {showCopyButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyIP}
            className="text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

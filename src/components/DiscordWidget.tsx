import { MessageSquare, Users, ExternalLink } from "lucide-react";

export const DiscordWidget = () => {
  return (
    <a
      href="https://discord.gg/smpprac"
      target="_blank"
      rel="noopener noreferrer"
      className="block glass-card rounded-lg p-4 hover-glow group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-[#5865F2]/10">
            <MessageSquare className="w-5 h-5 text-[#5865F2]" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">Discord</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                1,250
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                89 çevrimiçi
              </span>
            </div>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </a>
  );
};

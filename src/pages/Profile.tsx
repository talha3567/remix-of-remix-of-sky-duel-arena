import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { StarField } from "@/components/StarField";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Loader2, Camera, Swords, Trophy, Skull, Target, Flame } from "lucide-react";

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

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
    } else if (data) {
      setProfile(data);
      setUsername(data.username || "");
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    setUploading(true);

    // Delete old avatar if exists
    if (profile?.avatar_url) {
      const oldPath = profile.avatar_url.split("/avatars/")[1];
      if (oldPath) {
        await supabase.storage.from("avatars").remove([oldPath]);
      }
    }

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Hata",
        description: "Avatar yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", user.id);

    if (updateError) {
      toast({
        title: "Hata",
        description: "Profil güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    } else {
      setProfile((prev) => prev ? { ...prev, avatar_url: publicUrl } : null);
      toast({
        title: "Başarılı!",
        description: "Avatar güncellendi.",
      });
    }

    setUploading(false);
  };

  const handleSaveUsername = async () => {
    if (!user || !username.trim()) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ username: username.trim() })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Hata",
        description: "Kullanıcı adı güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    } else {
      setProfile((prev) => prev ? { ...prev, username: username.trim() } : null);
      toast({
        title: "Başarılı!",
        description: "Kullanıcı adı güncellendi.",
      });
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const kdr = profile ? (profile.total_deaths > 0 ? (profile.total_kills / profile.total_deaths).toFixed(2) : profile.total_kills.toString()) : "0";
  const winRate = profile ? (profile.total_duels > 0 ? ((profile.total_wins / profile.total_duels) * 100).toFixed(1) : "0") : "0";

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarField />
      <BackButton />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-primary">Oyuncu</span> Profili
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="bg-card/80 backdrop-blur-lg border-border/50">
            <CardHeader>
              <CardTitle className="text-primary">Profil Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-2 border-primary/50">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                      {profile?.username?.charAt(0).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <div className="flex gap-2">
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Kullanıcı adınız"
                    className="bg-background/50"
                  />
                  <Button 
                    onClick={handleSaveUsername}
                    disabled={saving || username === profile?.username}
                    size="sm"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Kaydet"}
                  </Button>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <p className="text-muted-foreground text-sm px-3 py-2 bg-background/30 rounded-lg">
                  {user?.email}
                </p>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={handleSignOut}
              >
                Çıkış Yap
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-card/80 backdrop-blur-lg border-border/50">
            <CardHeader>
              <CardTitle className="text-primary">İstatistikler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-xl p-4 text-center border border-border/30">
                  <Swords className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile?.total_kills || 0}</p>
                  <p className="text-sm text-muted-foreground">Öldürme</p>
                </div>

                <div className="bg-background/50 rounded-xl p-4 text-center border border-border/30">
                  <Skull className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile?.total_deaths || 0}</p>
                  <p className="text-sm text-muted-foreground">Ölüm</p>
                </div>

                <div className="bg-background/50 rounded-xl p-4 text-center border border-border/30">
                  <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile?.total_wins || 0}</p>
                  <p className="text-sm text-muted-foreground">Galibiyet</p>
                </div>

                <div className="bg-background/50 rounded-xl p-4 text-center border border-border/30">
                  <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile?.total_duels || 0}</p>
                  <p className="text-sm text-muted-foreground">Toplam Düello</p>
                </div>

                <div className="bg-background/50 rounded-xl p-4 text-center border border-border/30">
                  <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile?.win_streak || 0}</p>
                  <p className="text-sm text-muted-foreground">Aktif Seri</p>
                </div>

                <div className="bg-background/50 rounded-xl p-4 text-center border border-border/30">
                  <Flame className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{profile?.best_win_streak || 0}</p>
                  <p className="text-sm text-muted-foreground">En İyi Seri</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-4 text-center border border-primary/30">
                  <p className="text-3xl font-bold text-primary">{kdr}</p>
                  <p className="text-sm text-muted-foreground">K/D Oranı</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-xl p-4 text-center border border-emerald-500/30">
                  <p className="text-3xl font-bold text-emerald-400">{winRate}%</p>
                  <p className="text-sm text-muted-foreground">Kazanma Oranı</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

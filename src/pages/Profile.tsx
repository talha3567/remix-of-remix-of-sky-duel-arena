import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Loader2, Camera, Swords, Trophy, Skull, Target, Flame, ArrowLeft } from "lucide-react";

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
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
    if (!error && data) { setProfile(data); setUsername(data.username || ""); }
    setLoading(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;
    const file = e.target.files[0];
    const filePath = `${user.id}/${Date.now()}.${file.name.split(".").pop()}`;
    setUploading(true);
    if (profile?.avatar_url) {
      const oldPath = profile.avatar_url.split("/avatars/")[1];
      if (oldPath) await supabase.storage.from("avatars").remove([oldPath]);
    }
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);
    if (uploadError) { toast({ title: "Hata", description: "Avatar yüklenirken hata oluştu.", variant: "destructive" }); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const { error: updateError } = await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("user_id", user.id);
    if (!updateError) { setProfile((prev) => prev ? { ...prev, avatar_url: publicUrl } : null); toast({ title: "Başarılı!", description: "Avatar güncellendi." }); }
    setUploading(false);
  };

  const handleSaveUsername = async () => {
    if (!user || !username.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ username: username.trim() }).eq("user_id", user.id);
    if (!error) { setProfile((prev) => prev ? { ...prev, username: username.trim() } : null); toast({ title: "Başarılı!", description: "Kullanıcı adı güncellendi." }); }
    setSaving(false);
  };

  const handleSignOut = async () => { await signOut(); navigate("/"); };

  const kdr = profile ? (profile.total_deaths > 0 ? (profile.total_kills / profile.total_deaths).toFixed(2) : profile.total_kills.toString()) : "0";
  const winRate = profile ? (profile.total_duels > 0 ? ((profile.total_wins / profile.total_duels) * 100).toFixed(1) : "0") : "0";

  if (authLoading || loading) return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-foreground" /></div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8 fade-in">
            <ArrowLeft className="w-4 h-4" />Anasayfa
          </Link>

          <h1 className="text-4xl font-bold mb-8 fade-in">Profil</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-lg p-6 fade-in">
              <h2 className="text-lg font-semibold mb-6">Profil Bilgileri</h2>
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-2 border-border/50">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-secondary text-foreground text-2xl">{profile?.username?.charAt(0).toUpperCase() || "?"}</AvatarFallback>
                  </Avatar>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-foreground text-background rounded-full p-2 cursor-pointer hover:opacity-80 transition-opacity">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                  </label>
                  <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploading} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                  <div className="flex gap-2">
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Kullanıcı adınız" className="bg-secondary/50 border-border/30" />
                    <Button onClick={handleSaveUsername} disabled={saving || username === profile?.username} size="sm">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Kaydet"}</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <p className="text-muted-foreground text-sm px-3 py-2 bg-secondary/30 rounded-lg">{user?.email}</p>
                </div>
                <Button variant="outline" className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10" onClick={handleSignOut}>Çıkış Yap</Button>
              </div>
            </div>

            <div className="glass-card rounded-lg p-6 fade-in-delay-1">
              <h2 className="text-lg font-semibold mb-6">İstatistikler</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 rounded-lg p-3 text-center"><Swords className="w-5 h-5 text-foreground mx-auto mb-1" /><p className="text-xl font-bold">{profile?.total_kills || 0}</p><p className="text-xs text-muted-foreground">Öldürme</p></div>
                <div className="bg-secondary/30 rounded-lg p-3 text-center"><Skull className="w-5 h-5 text-red-500 mx-auto mb-1" /><p className="text-xl font-bold">{profile?.total_deaths || 0}</p><p className="text-xs text-muted-foreground">Ölüm</p></div>
                <div className="bg-secondary/30 rounded-lg p-3 text-center"><Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" /><p className="text-xl font-bold">{profile?.total_wins || 0}</p><p className="text-xs text-muted-foreground">Galibiyet</p></div>
                <div className="bg-secondary/30 rounded-lg p-3 text-center"><Target className="w-5 h-5 text-muted-foreground mx-auto mb-1" /><p className="text-xl font-bold">{profile?.total_duels || 0}</p><p className="text-xs text-muted-foreground">Düello</p></div>
                <div className="bg-secondary/30 rounded-lg p-3 text-center"><Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" /><p className="text-xl font-bold">{profile?.win_streak || 0}</p><p className="text-xs text-muted-foreground">Aktif Seri</p></div>
                <div className="bg-secondary/30 rounded-lg p-3 text-center"><Flame className="w-5 h-5 text-green-500 mx-auto mb-1" /><p className="text-xl font-bold">{profile?.best_win_streak || 0}</p><p className="text-xs text-muted-foreground">En İyi Seri</p></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 rounded-lg p-4 text-center"><p className="text-2xl font-bold">{kdr}</p><p className="text-xs text-muted-foreground">K/D Oranı</p></div>
                <div className="bg-secondary/30 rounded-lg p-4 text-center"><p className="text-2xl font-bold">{winRate}%</p><p className="text-xs text-muted-foreground">Kazanma Oranı</p></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

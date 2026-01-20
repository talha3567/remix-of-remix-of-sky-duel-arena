import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir email adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

const signupSchema = loginSchema.extend({
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
          toast({ title: "Hata", description: validation.error.errors[0].message, variant: "destructive" });
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(email, password);
        if (error) {
          toast({ title: "Giriş Hatası", description: error.message === "Invalid login credentials" ? "Email veya şifre hatalı" : error.message, variant: "destructive" });
        } else {
          toast({ title: "Hoş geldiniz!", description: "Başarıyla giriş yaptınız." });
          navigate("/");
        }
      } else {
        const validation = signupSchema.safeParse({ email, password, confirmPassword, username });
        if (!validation.success) {
          toast({ title: "Hata", description: validation.error.errors[0].message, variant: "destructive" });
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(email, password, username);
        if (error) {
          toast({ title: "Kayıt Hatası", description: error.message.includes("already registered") ? "Bu email adresi zaten kayıtlı." : error.message, variant: "destructive" });
        } else {
          toast({ title: "Kayıt Başarılı!", description: "Hesabınız oluşturuldu. Hoş geldiniz!" });
          navigate("/");
        }
      }
    } catch (error) {
      toast({ title: "Hata", description: "Bir hata oluştu. Lütfen tekrar deneyin.", variant: "destructive" });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span>Geri Dön</span>
      </Link>
      
      <Card className="w-full max-w-md glass-card border-border/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">SMPPRAC</CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin ? "Hesabınıza giriş yapın" : "Yeni hesap oluşturun"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input id="username" type="text" placeholder="xPro_Gamer47" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-secondary/50 border-border/30" />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-secondary/50 border-border/30" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-secondary/50 border-border/30" />
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-secondary/50 border-border/30" />
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Lütfen bekleyin...</> : (isLogin ? "Giriş Yap" : "Kayıt Ol")}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}
              <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-foreground hover:underline font-medium">
                {isLogin ? "Kayıt Ol" : "Giriş Yap"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

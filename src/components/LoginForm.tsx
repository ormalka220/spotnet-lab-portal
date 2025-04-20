
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful login
      localStorage.setItem("user", JSON.stringify({ name: "אור", email }));
      toast({
        title: "ברוך הבא!",
        description: "התחברת בהצלחה למערכת.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="w-full max-w-md space-y-6 p-8 glass-effect rounded-2xl animate-fade-in">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">SpotNet Lab Portal</h1>
        <p className="text-muted-foreground">התחבר כדי לגשת למעבדות הווירטואליות</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">דוא"ל</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl h-12"
            dir="ltr"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">סיסמה</Label>
            <Button variant="link" size="sm" className="px-0 font-normal h-auto">
              שכחתי סיסמה
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-xl h-12"
            dir="ltr"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full h-12 rounded-full transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "מתחבר..." : "התחברות"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot, getMoodFromAction, getRandomCharacter } from "./KawaiiMascot";
import { Download, Eye, EyeOff } from "lucide-react";

interface DiscussionAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const DiscussionAuthModal = ({ isOpen, onClose, onSuccess }: DiscussionAuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCredentialsPrompt, setShowCredentialsPrompt] = useState(false);
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);
  const [mascotMood, setMascotMood] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mascotCharacter] = useState(getRandomCharacter());

  const { login, signup } = useDiscussionAuth();
  const { toast } = useToast();

  const downloadCredentials = () => {
    if (!credentials) return;
    
    const content = `Study Hub Discussion Credentials\n================================\nUsername: ${credentials.username}\nPassword: ${credentials.password}\n\nKeep this file safe!`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studyhub-credentials-${credentials.username}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.length < 3) {
      toast({ title: "Username must be at least 3 characters", variant: "destructive" });
      return;
    }
    
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    setMascotMood('loading');

    try {
      if (isLogin) {
        await login(username, password);
        setMascotMood('success');
        toast({ title: "Welcome back! 🎉" });
        onSuccess?.();
        onClose();
      } else {
        const creds = await signup(username, password, email || undefined);
        setCredentials(creds);
        setShowCredentialsPrompt(true);
        setMascotMood('success');
        toast({ title: "Account created! +5 XP 🎉" });
      }
      setUsername("");
      setPassword("");
      setEmail("");
    } catch (error: any) {
      setMascotMood('error');
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialsClose = () => {
    setShowCredentialsPrompt(false);
    setCredentials(null);
    onSuccess?.();
    onClose();
  };

  if (showCredentialsPrompt && credentials) {
    return (
      <Dialog open={true} onOpenChange={handleCredentialsClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KawaiiMascot character="file" mood="excited" size={40} />
              Save Your Credentials
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Download your credentials now - you won't see this again!
            </p>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <p><strong>Username:</strong> {credentials.username}</p>
              <p><strong>Password:</strong> ••••••••</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadCredentials} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Credentials
              </Button>
              <Button variant="outline" onClick={handleCredentialsClose}>
                Skip
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-3">
            <KawaiiMascot 
              character={mascotCharacter} 
              mood={getMoodFromAction(mascotMood)} 
              size={60}
            />
            <span>{isLogin ? "Welcome Back!" : "Join Discussions"}</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              required
              placeholder="choose_a_username"
              autoComplete="username"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="For account recovery"
                autoComplete="email"
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Loading...
              </span>
            ) : isLogin ? "Login" : "Sign Up (+5 XP)"}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

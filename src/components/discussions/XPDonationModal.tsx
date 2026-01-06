import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot } from "./KawaiiMascot";
import { Gift, Sparkles } from "lucide-react";

interface XPDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserId: string;
  targetUsername: string;
  onDonationComplete?: () => void;
}

export const XPDonationModal = ({ 
  isOpen, 
  onClose, 
  targetUserId, 
  targetUsername,
  onDonationComplete 
}: XPDonationModalProps) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, profile } = useDiscussionAuth();
  const { toast } = useToast();

  const handleDonate = async () => {
    if (!user || !profile) return;

    const donationAmount = parseInt(amount);
    
    if (isNaN(donationAmount) || donationAmount <= 0) {
      toast({ title: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    if (donationAmount > profile.xp) {
      toast({ title: "You don't have enough XP", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('xp_donations')
        .insert({
          from_user_id: user.id,
          to_user_id: targetUserId,
          amount: donationAmount,
          message: message || null,
        });

      if (error) throw error;

      toast({ 
        title: `Donated ${donationAmount} XP to @${targetUsername}! 🎁`,
        description: "Thank you for being generous!"
      });
      
      onDonationComplete?.();
      onClose();
      setAmount("");
      setMessage("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const presetAmounts = [5, 10, 25, 50];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Donate XP to @{targetUsername}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <KawaiiMascot character="iceCream" mood="excited" size={80} />
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Your balance: <span className="font-bold text-primary">{profile?.xp || 0} XP</span>
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="flex gap-2 flex-wrap">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant={amount === preset.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAmount(preset.toString())}
                  disabled={preset > (profile?.xp || 0)}
                >
                  {preset} XP
                </Button>
              ))}
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Custom amount"
              min={1}
              max={profile?.xp || 0}
            />
          </div>

          <div className="space-y-2">
            <Label>Message (optional)</Label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a nice message..."
              maxLength={100}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleDonate} disabled={loading || !amount}>
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Donating..." : "Donate XP"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

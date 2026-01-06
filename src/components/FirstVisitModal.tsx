import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";

interface FirstVisitModalProps {
  open: boolean;
  onChoice: (useEmoji: boolean) => void;
}

export const FirstVisitModal = ({ open, onChoice }: FirstVisitModalProps) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border"  onInteractOutside={(e) => e.preventDefault()}>
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Smile className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome! 👋
            </h2>
            <p className="text-muted-foreground">
              Do you want to use emoji mode for tracking your progress?
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => onChoice(false)}
              variant="outline"
              className="flex-1 border-border"
            >
              No, thanks
            </Button>
            <Button
              onClick={() => onChoice(true)}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Yes, use emojis!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Save } from "lucide-react";

interface EditObjectiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentText: string;
  onSave: (newText: string) => void;
}

export const EditObjectiveModal = ({
  open,
  onOpenChange,
  currentText,
  onSave,
}: EditObjectiveModalProps) => {
  const [text, setText] = useState(currentText);

  useEffect(() => {
    setText(currentText);
  }, [currentText, open]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim());
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Edit Objective</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Update the objective text
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            <Label htmlFor="objective-text">Objective Text</Label>
            <Input
              id="objective-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter objective text..."
              className="bg-background border-border"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

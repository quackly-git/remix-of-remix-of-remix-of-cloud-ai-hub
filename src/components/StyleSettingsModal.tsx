import { X, Type, Minus, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStyle } from "@/contexts/StyleContext";
import { Slider } from "@/components/ui/slider";

interface StyleSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StyleSettingsModal = ({ open, onOpenChange }: StyleSettingsModalProps) => {
  const { fontSize, fontFamily, setFontSize, setFontFamily, increaseFontSize, decreaseFontSize } = useStyle();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                Style Settings
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Customize the appearance of your checklist
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Font Size</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseFontSize}
                  className="border-border"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Slider
                    value={[fontSize]}
                    onValueChange={(values) => setFontSize(values[0])}
                    min={75}
                    max={150}
                    step={5}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseFontSize}
                  className="border-border"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground min-w-[3rem]">{fontSize}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Font Family</Label>
              <Select value={fontFamily} onValueChange={(value: any) => setFontFamily(value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sora">
                    <span className="font-sora">Sora (Default)</span>
                  </SelectItem>
                  <SelectItem value="inter">
                    <span className="font-inter">Inter</span>
                  </SelectItem>
                  <SelectItem value="roboto">
                    <span className="font-roboto">Roboto</span>
                  </SelectItem>
                  <SelectItem value="poppins">
                    <span className="font-poppins">Poppins</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-primary hover:bg-primary/90 px-8"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

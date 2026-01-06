import { X, Palette, ChevronDown, Type } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FlashcardSettings } from "@/pages/Flashcards";

interface FlashcardSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: FlashcardSettings;
  onSettingsChange: (settings: FlashcardSettings) => void;
}

export const FlashcardSettingsModal = ({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
}: FlashcardSettingsModalProps) => {
  const handleReset = () => {
    onSettingsChange({
      borderRadius: 16,
      backgroundColor: "hsl(var(--background))",
      textColor: "hsl(var(--foreground))",
      fontFamily: "sora",
      fontSize: 16,
      showModalOnClick: true,
      showEditButton: true,
    });
  };

  const colorPresets = [
    {
      name: "Default",
      bg: "var(--bb)",
      text: "hsl(var(--foreground))",
    },
    {
      name: "Black/White",
      bg: "hsl(var(--background))",
      text: "hsl(var(--foreground))",
    },
    {
      name: "Primary",
      bg: "hsl(var(--primary))",
      text: "hsl(var(--primary-foreground))",
    },
    { name: "Blue", bg: "hsl(221 83% 53%)", text: "#ffffff" },
    { name: "Green", bg: "hsl(142 71% 45%)", text: "#ffffff" },
    { name: "Purple", bg: "hsl(271 81% 56%)", text: "#ffffff" },
    { name: "Orange", bg: "hsl(18 95% 60%)", text: "#ffffff" },
    { name: "Red", bg: "hsl(0 72% 51%)", text: "#ffffff" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Flashcard Settings
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Customize your flashcards appearance
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
            {/* Border Radius */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Corner Roundness
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[settings.borderRadius]}
                  onValueChange={(values) =>
                    onSettingsChange({ ...settings, borderRadius: values[0] })
                  }
                  min={0}
                  max={48}
                  step={4}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground min-w-[3rem]">
                  {settings.borderRadius}px
                </span>
              </div>
            </div>

            {/* Font Settings */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-primary" />
                  <Label className="text-base font-semibold cursor-pointer">
                    Font Settings
                  </Label>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-3">
                {/* Font Family */}
                <div className="space-y-3">
                  <Label className="text-sm">Font Family</Label>
                  <Select
                    value={settings.fontFamily}
                    onValueChange={(value) =>
                      onSettingsChange({ ...settings, fontFamily: value })
                    }
                  >
                    <SelectTrigger>
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

                {/* Font Size */}
                <div className="space-y-3">
                  <Label className="text-sm">Font Size</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(values) =>
                        onSettingsChange({ ...settings, fontSize: values[0] })
                      }
                      min={12}
                      max={24}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground min-w-[3rem]">
                      {settings.fontSize}px
                    </span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Color Presets */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <Label className="text-base font-semibold cursor-pointer">
                    Color Settings
                  </Label>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">Color Presets</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        className="h-auto p-3"
                        onClick={() =>
                          onSettingsChange({
                            ...settings,
                            backgroundColor: preset.bg,
                            textColor: preset.text,
                          })
                        }
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: preset.bg }}
                          />
                          <span className="text-xs">{preset.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={
                          settings.backgroundColor.startsWith("#")
                            ? settings.backgroundColor
                            : "#ffffff"
                        }
                        onChange={(e) =>
                          onSettingsChange({
                            ...settings,
                            backgroundColor: e.target.value,
                          })
                        }
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={settings.backgroundColor}
                        onChange={(e) =>
                          onSettingsChange({
                            ...settings,
                            backgroundColor: e.target.value,
                          })
                        }
                        placeholder="HSL or Hex"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={
                          settings.textColor.startsWith("#")
                            ? settings.textColor
                            : "#000000"
                        }
                        onChange={(e) =>
                          onSettingsChange({
                            ...settings,
                            textColor: e.target.value,
                          })
                        }
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={settings.textColor}
                        onChange={(e) =>
                          onSettingsChange({
                            ...settings,
                            textColor: e.target.value,
                          })
                        }
                        placeholder="HSL or Hex"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Modal Click Toggle */}
            <div className="flex items-center justify-between space-x-2 pt-2 border-t">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">
                  Show Modal on Click
                </Label>
                <p className="text-sm text-muted-foreground">
                  Click flashcards in grid to view in modal
                </p>
              </div>
              <Switch
                checked={settings.showModalOnClick}
                onCheckedChange={(checked) =>
                  onSettingsChange({ ...settings, showModalOnClick: checked })
                }
              />
            </div>

            {/* Edit Button Toggle */}
            <div className="flex items-center justify-between space-x-2 pt-2 border-t">
              <div className="space-y-0.5">
                <Label className="text-base font-semibold">
                  Show Edit Button
                </Label>
                <p className="text-sm text-muted-foreground">
                  Display edit and delete buttons on flashcards
                </p>
              </div>
              <Switch
                checked={settings.showEditButton}
                onCheckedChange={(checked) =>
                  onSettingsChange({ ...settings, showEditButton: checked })
                }
              />
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={() => onOpenChange(false)}>Done</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

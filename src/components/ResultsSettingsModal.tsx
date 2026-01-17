import React from "react";
import {
  Calendar as CalendarIcon,
  Palette,
  Settings,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface ResultsTimerDisplaySettings {
  backgroundColor: string;
  fontColor: string;
  fontFamily: string;
  fontSize: number;
  showDays: boolean;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  showProgressBar: boolean;
  isFullscreen: boolean;
}

interface ResultsSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: ResultsTimerDisplaySettings;
  updateSettings: (updates: Partial<ResultsTimerDisplaySettings>) => void;
}

const colorPresets = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#ec4899" },
  { name: "Gray", value: "#6b7280" },
];

const fontOptions = [
  { name: "Sora", value: "Sora, sans-serif" },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Open Sans", value: "Open Sans, sans-serif" },
  { name: "Montserrat", value: "Montserrat, sans-serif" },
];

export const ResultsSettingsModal: React.FC<ResultsSettingsModalProps> = ({
  open,
  onOpenChange,
  settings,
  updateSettings,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Results Timer Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Display Options */}
          <div className="space-y-4">
            <Label>Display Options</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.showProgressBar}
                  onCheckedChange={(checked) =>
                    updateSettings({ showProgressBar: checked })
                  }
                />
                <Label>Show Progress Bar</Label>
              </div>
            </div>
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <Label>Background Color</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {colorPresets.map((color) => (
                <button
                  key={color.name}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    settings.backgroundColor === color.value
                      ? "border-foreground scale-110"
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: color.value }}
                  onClick={() =>
                    updateSettings({ backgroundColor: color.value })
                  }
                  title={color.name}
                />
              ))}
            </div>
            <Input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) =>
                updateSettings({ backgroundColor: e.target.value })
              }
              className="w-20 h-10"
            />
          </div>

          {/* Font Color */}
          <div className="space-y-2">
            <Label>Font Color</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["#ffffff", "#000000", "#374151", "#6b7280", "#f3f4f6"].map(
                (color) => (
                  <button
                    key={color}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      settings.fontColor === color
                        ? "border-foreground scale-110"
                        : "border-border hover:scale-105"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => updateSettings({ fontColor: color })}
                  />
                )
              )}
            </div>
            <Input
              type="color"
              value={settings.fontColor}
              onChange={(e) => updateSettings({ fontColor: e.target.value })}
              className="w-20 h-10"
            />
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select
              value={settings.fontFamily}
              onValueChange={(value) => updateSettings({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label>Font Size: {settings.fontSize}px</Label>
            <Slider
              value={[settings.fontSize]}
              onValueChange={(value) => updateSettings({ fontSize: value[0] })}
              max={120}
              min={24}
              step={4}
              className="w-full"
            />
          </div>

          {/* Time Format */}
          <div className="space-y-4">
            <Label>Time Format</Label>
            <p className="text-sm text-muted-foreground">
              When a unit is disabled, its time will be converted to the next
              smaller unit
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.showDays}
                  onCheckedChange={(checked) =>
                    updateSettings({ showDays: checked })
                  }
                />
                <Label>Days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.showHours}
                  onCheckedChange={(checked) =>
                    updateSettings({ showHours: checked })
                  }
                />
                <Label>Hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.showMinutes}
                  onCheckedChange={(checked) =>
                    updateSettings({ showMinutes: checked })
                  }
                />
                <Label>Minutes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.showSeconds}
                  onCheckedChange={(checked) =>
                    updateSettings({ showSeconds: checked })
                  }
                />
                <Label>Seconds</Label>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

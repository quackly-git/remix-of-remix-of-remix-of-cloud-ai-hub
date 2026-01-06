import { useState, useEffect } from "react";
import { CaseSensitive, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface FontSettings {
  size: number;
  family: string;
  color: string;
  enableAnnotationPopover: boolean;
  highlightColor: string;
  availableHighlightColors: string[];
}

export function FontSettingsModal() {
  const [fontSettings, setFontSettings] = useLocalStorage<FontSettings>(
    "font-settings",
    {
      size: 16,
      family:
        '"Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: "default",
      enableAnnotationPopover: true,
      highlightColor: "#fef08a",
      availableHighlightColors: [
        "#fef08a",
        "#bbf7d0",
        "#bfdbfe",
        "#f9a8d4",
        "#e9d5ff",
        "#fed7aa",
      ],
    }
  );

  // Apply font settings to document root immediately
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--content-font-size", `${fontSettings.size}px`);
    root.style.setProperty("--content-font-family", fontSettings.family);
    root.style.setProperty(
      "--content-text-color",
      fontSettings.color === "default" ? "inherit" : fontSettings.color
    );

    // Trigger custom event for content re-render
    const event = new CustomEvent("fontSettingsChanged", {
      detail: fontSettings,
    });
    window.dispatchEvent(event);
  }, [fontSettings]);

  // Trigger refresh when enableAnnotationPopover changes
  useEffect(() => {
    // Optionally trigger re-render or refresh here
    if (fontSettings.enableAnnotationPopover) {
      console.log("Annotation Popover is ENABLED");
    } else {
      console.log("Annotation Popover is DISABLED");
    }
  }, [fontSettings.enableAnnotationPopover]);

  const fontFamilies = [
    { name: "Sora (Recommended)", value: '"Sora", sans-serif' },
    { name: "Inter", value: '"Inter", sans-serif' },
    {
      name: "System Font",
      value:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    { name: "Open Sans", value: '"Open Sans", sans-serif' },
    { name: "Roboto", value: '"Roboto", sans-serif' },
    { name: "Poppins", value: '"Poppins", sans-serif' },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Times New Roman", value: '"Times New Roman", serif' },
  ];
  const hexToRgb = (hex: string) => {
    const result = /^#([a-f0-9]{6}|[a-f0-9]{3})$/i.exec(hex);
    if (!result) return null;
    let r: number, g: number, b: number;
    if (result[1].length === 4) {
      r = parseInt(result[1].charAt(1) + result[1].charAt(1), 16);
      g = parseInt(result[1].charAt(2) + result[1].charAt(2), 16);
      b = parseInt(result[1].charAt(3) + result[1].charAt(3), 16);
    } else {
      r = parseInt(result[1].substring(0, 2), 16);
      g = parseInt(result[1].substring(2, 4), 16);
      b = parseInt(result[1].substring(4, 6), 16);
    }
    return [r, g, b];
  };

  const rgbToHex = (rgb: number[]): string => {
    return `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  };

  const getDarkerColor = (color: string): string => {
    // Convert hex to RGB
    const rgb = hexToRgb(color);
    if (!rgb) return "#000000"; // Default to black if invalid color

    // Darken the color by reducing the RGB values significantly
    const darkenedRgb = rgb.map((value) => Math.max(value - 150, 0)); // Darken by 150 for more contrast

    // Convert back to hex
    return rgbToHex(darkenedRgb);
  };

  const textColors = [
    { name: "Default", value: "default" },
    { name: "Dark Gray", value: "#374151" },
    { name: "Blue", value: "#1e40af" },
    { name: "Green", value: "#166534" },
    { name: "Purple", value: "#7c2d12" },
    { name: "Brown", value: "#92400e" },
  ];

  const highlightColors = [
    { name: "Yellow", value: "#fef08a" },
    { name: "Green", value: "#bbf7d0" },
    { name: "Blue", value: "#bfdbfe" },
    { name: "Pink", value: "#f9a8d4" },
    { name: "Purple", value: "#e9d5ff" },
    { name: "Orange", value: "#fed7aa" },
    { name: "Red", value: "#fecaca" },
    { name: "Teal", value: "#a7f3d0" },
  ];

  // Update font settings function (used in the modal)
  const updateFontSettings = (updates: Partial<FontSettings>) => {
    const newSettings = { ...fontSettings, ...updates };
    setFontSettings(newSettings);

    // Only dispatch event if 'enableAnnotationPopover' has changed
    if (updates.hasOwnProperty("enableAnnotationPopover")) {
      const event = new CustomEvent("fontSettingsChanged", {
        detail: { enableAnnotationPopover: updates.enableAnnotationPopover },
      });
      window.dispatchEvent(event); // Trigger the event
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CaseSensitive className="h-6 w-6" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Font Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Font Size */}
          <div className="space-y-2">
            <Label>Font Size: {fontSettings.size}px</Label>
            <Slider
              value={[fontSettings.size]}
              onValueChange={(value) => updateFontSettings({ size: value[0] })}
              max={24}
              min={12}
              step={1}
              className="w-full cursor-pointer"
            />
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select
              value={fontSettings.family}
              onValueChange={(value) => updateFontSettings({ family: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <Label>Text Color</Label>
            <Select
              value={fontSettings.color}
              onValueChange={(value) => updateFontSettings({ color: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {textColors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{
                          backgroundColor:
                            color.value === "default"
                              ? "currentColor"
                              : color.value,
                        }}
                      />
                      {color.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Highlight Color */}
          <div className="space-y-2">
            <Label>Current Highlight Color</Label>
            <div className="flex gap-1">
              {" "}
              {/* Reduced gap here */}
              {highlightColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() =>
                    updateFontSettings({ highlightColor: color.value })
                  }
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    fontSettings.highlightColor === color.value
                      ? "border-primary scale-110"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Selected:{" "}
              {highlightColors.find(
                (c) => c.value === fontSettings.highlightColor
              )?.name || "Custom"}
            </p>
          </div>

          {/* Annotation Popover Toggle */}
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Text Selection Popover</Label>
              <p className="text-xs text-muted-foreground">
                Show copy, tag, and comment options when selecting text
              </p>
            </div>
            <Switch
              checked={fontSettings.enableAnnotationPopover}
              onCheckedChange={(checked) => {
                // Only update and trigger re-render when `enableAnnotationPopover` changes
                updateFontSettings({ enableAnnotationPopover: checked });
              }}
            />
          </div>

          {/* Preview */}
          <div className="p-4 border rounded-lg">
            <Label className="text-sm text-muted-foreground">
              Live Preview
            </Label>
            <p
              style={{
                fontSize: `${fontSettings.size}px`,
                fontFamily: fontSettings.family,
                color:
                  fontSettings.color === "default"
                    ? "inherit"
                    : fontSettings.color,
                lineHeight: 1.6,
              }}
            >
              This is how your notes text will appear with the selected font
              settings.
              <span
                style={{
                  backgroundColor: fontSettings.highlightColor,
                  color: getDarkerColor(fontSettings.highlightColor), // Apply darker text color
                  padding: "2px 4px",
                  borderRadius: "3px",
                }}
              >
                This text shows your current highlight color.
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

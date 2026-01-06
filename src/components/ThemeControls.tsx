import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Palette, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeControlsProps {
  className?: string;
}

const colorThemes = [
  { name: "Orange", value: "orange" as const, color: "hsl(18, 95%, 60%)" },
  { name: "Blue", value: "blue" as const, color: "hsl(221, 83%, 53%)" },
  { name: "Green", value: "green" as const, color: "hsl(142, 71%, 45%)" },
  { name: "Purple", value: "purple" as const, color: "hsl(271, 81%, 56%)" },
  { name: "Red", value: "red" as const, color: "hsl(0, 72%, 51%)" },
];

export const ThemeControls = ({ className = "" }: ThemeControlsProps) => {
  const { theme, toggleTheme, colorTheme, setColorTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="border-border hover:bg-secondary"
        aria-label="Toggle dark mode"
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen((v) => !v)}
          className="border-border hover:bg-secondary"
          aria-label="Choose color theme"
        >
          <Palette className="h-4 w-4" />
        </Button>
        {open && (
          <div className="absolute right-0 top-12 z-50 bg-card border border-border rounded-lg p-3 shadow-lg">
            <div className="flex gap-2">
              {colorThemes.map((ct) => (
                <button
                  key={ct.value}
                  onClick={() => {
                    setColorTheme(ct.value);
                    setOpen(false);
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    colorTheme === ct.value ? "border-foreground scale-110" : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: ct.color }}
                  title={ct.name}
                  aria-label={`Set ${ct.name} theme`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeControls;

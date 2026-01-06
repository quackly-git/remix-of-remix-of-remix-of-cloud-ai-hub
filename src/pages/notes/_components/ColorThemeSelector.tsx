import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { useEffect } from "react";

const themes = [
  {
    name: "Blue",
    value: "blue",
    color: "#3b82f6",
    primary: "221 65% 55%",
    primaryForeground: "210 40% 98%",
  },
  {
    name: "Green",
    value: "green",
    color: "#059669",
    primary: "160 84% 39%",
    primaryForeground: "0 0% 100%",
  },
  {
    name: "Purple",
    value: "purple",
    color: "#7c3aed",
    primary: "262 45% 65%",
    primaryForeground: "210 40% 98%",
  },
  {
    name: "Red",
    value: "red",
    color: "#dc2626",
    primary: "0 60% 55%",
    primaryForeground: "210 40% 98%",
  },
  {
    name: "Pink",
    value: "pink",
    color: "#ec4bcf",
    primary: "330 55% 70%",
    primaryForeground: "210 40% 98%",
  },
  {
    name: "Orange",
    value: "orange",
    color: "#ea580c",
    primary: "20 65% 55%",
    primaryForeground: "60 9% 98%",
  },
];

export function ColorThemeSelector() {
  const [colorTheme, setColorTheme] = useLocalStorage("color-theme", "blue");

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes.find((theme) => theme.value === colorTheme);

    if (currentTheme) {
      // Update CSS custom properties
      root.style.setProperty("--primary", currentTheme.primary);
      root.style.setProperty(
        "--primary-foreground",
        currentTheme.primaryForeground
      );
      root.style.setProperty("--ring", currentTheme.primary);
      root.style.setProperty("--sidebar-primary", currentTheme.primary);
      root.style.setProperty("--sidebar-ring", currentTheme.primary);
      root.style.setProperty("--highlight-color", currentTheme.primary);
    }

    // Remove all theme classes and add current one
    themes.forEach((theme) => {
      root.classList.remove(`theme-${theme.value}`);
    });
    root.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);

  const currentTheme = themes.find((theme) => theme.value === colorTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <div
            className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background"
            style={{ backgroundColor: currentTheme?.color }}
          />
          <span className="sr-only">Select color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setColorTheme(theme.value)}
            className={colorTheme === theme.value ? "bg-accent" : ""}
          >
            <div
              className="mr-2 h-4 w-4 rounded-full border border-border"
              style={{ backgroundColor: theme.color }}
            />
            <span>{theme.name}</span>
            {colorTheme === theme.value && (
              <div className="ml-auto h-2 w-2 rounded-full bg-current" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

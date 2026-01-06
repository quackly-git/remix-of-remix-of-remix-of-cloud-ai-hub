import { ThemeToggle } from "../ThemeToggle";
import { ColorThemeSelector } from "./ColorThemeSelector";
import { GlobalProfileButton } from "@/components/GlobalProfileButton";
import { ArrowLeft } from "lucide-react";

export function Navbar() {
  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="p-2 rounded-lg bg-primary/10">
            <ArrowLeft className="h-6 w-6 text-primary" />
          </div>
          Home
        </button>

        <div className="flex items-center gap-4">
          <ColorThemeSelector />
          <ThemeToggle />
          <GlobalProfileButton />
        </div>
      </div>
    </nav>
  );
}

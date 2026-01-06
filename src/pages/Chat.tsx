import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  MessageCircle,
  ArrowDown,
  ArrowDownRight,
  Download,
  Palette,
  Moon,
  Sun,
  ArrowLeft,
  MouseIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GiArrowCursor } from "react-icons/gi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { theme, colorTheme, toggleTheme, setColorTheme } = useTheme();
  const [colorThemeOpen, setColorThemeOpen] = useState(false);
  const colorThemes = [
    { name: "Orange", value: "orange" as const, color: "hsl(18, 95%, 60%)" },
    { name: "Blue", value: "blue" as const, color: "hsl(221, 83%, 53%)" },
    { name: "Green", value: "green" as const, color: "hsl(142, 71%, 45%)" },
    { name: "Purple", value: "purple" as const, color: "hsl(271, 81%, 56%)" },
    { name: "Red", value: "red" as const, color: "hsl(0, 72%, 51%)" },
  ];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Main content */} <ShootingStars className="pointer-events-none" />
      <StarsBackground className="pointer-events-none" />
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        {/* Back Button */}
        <Link to="/">
          <Button
            variant="ghost"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Button>
        </Link>

        {/* Right Controls */}
        <div className="flex gap-2">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-border hover:bg-secondary"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Color Theme Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setColorThemeOpen(!colorThemeOpen)}
              className="border-border hover:bg-secondary"
            >
              <Palette className="h-4 w-4" />
            </Button>
            {colorThemeOpen && (
              <div className="absolute right-0 top-10 z-50 bg-card border border-border rounded-lg p-3 shadow-lg">
                <div className="flex gap-2">
                  {colorThemes.map((ct) => (
                    <button
                      key={ct.value}
                      onClick={() => {
                        setColorTheme(ct.value);
                        setColorThemeOpen(false);
                        toast.success(`Theme changed to ${ct.name}`);
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        colorTheme === ct.value
                          ? "border-foreground scale-110"
                          : "border-border hover:scale-105"
                      }`}
                      style={{ backgroundColor: ct.color }}
                      title={ct.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isMobile && (
        <MaskContainer
          revealText={
            <p className="mx-auto min-w-full text-center text-4xl font-bold text-slate-800 dark:text-white flex items-baseline justify-center gap-2">
              Touch here..{" "}
              <GiArrowCursor className="text-6xl translate-y-16 inline-block" />
            </p>
          }
          className="h-[40rem] rounded-md text-white dark:text-black min-w-full"
        >
          <div className="text-center space-y-6 p-8 max-w-2xl">
            <div className="inline-flex items-center justify-center mb-4">
              <img src={`${colorTheme}.svg`} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Chat with Me!
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? Bored? Start a conversation!
            </p>
          </div>
        </MaskContainer>
      )}{" "}
      {isMobile && (
        <div className="text-center space-y-6 p-8 max-w-2xl">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={`${colorTheme}.svg`} />
          </div>
          <h1 className="text-4xl  sm:text-5xl font-bold text-foreground mb-4">
            Chat with Me!
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions? Bored? Start a conversation!
          </p>
        </div>
      )}
      {/* Arrows pointing to button */}
      <div className="fixed bottom-10 right-10 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-lg font-semibold text-primary">Use it to chat!!</p>
        <ArrowDownRight className="w-12 h-12 text-primary" />
      </div>
      <div
        className="fixed bottom-20 right-8 flex flex-col items-center gap-2 animate-bounce"
        style={{ animationDelay: "0.2s" }}
      >
        <ArrowDown className="w-8 h-8 text-primary" />
      </div>
    </div>
  );
};

export default Chat;

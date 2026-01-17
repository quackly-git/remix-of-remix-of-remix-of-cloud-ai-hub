import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultsCountdownTimer } from "./ResultsCountdownTimer";
import { ResultsTimerDisplaySettings } from "./ResultsSettingsModal";
import { Session } from "@/hooks/useResultsSettings";

interface FullscreenResultsCountdownProps {
  resultsDate: Date;
  session: Session | null;
  displaySettings: ResultsTimerDisplaySettings;
  onExitFullscreen: () => void;
}

export const FullscreenResultsCountdown: React.FC<FullscreenResultsCountdownProps> = ({
  resultsDate,
  session,
  displaySettings,
  onExitFullscreen,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExitFullscreen();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onExitFullscreen]);

  const handleMouseMove = () => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div
      className="fixed inset-0 z-50 cursor-none"
      onMouseMove={handleMouseMove}
      style={{ backgroundColor: displaySettings.backgroundColor }}
    >
      <div
        className={`absolute top-4 right-4 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onExitFullscreen}
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="h-full flex items-center justify-center">
        <ResultsCountdownTimer
          resultsDate={resultsDate}
          session={session}
          displaySettings={displaySettings}
        />
      </div>

      <div
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-white/60 text-sm">Press ESC to exit fullscreen</p>
      </div>
    </div>
  );
};
